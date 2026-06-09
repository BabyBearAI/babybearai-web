#!/usr/bin/env bash
# Generates camp images via Volcano Ark (doubao-seedream) and downloads them locally.
set -uo pipefail

API="https://ark.cn-beijing.volces.com/api/v3/images/generations"
KEY="ark-194cf35b-6865-4600-85f6-0cf02ee915b8-3d5ec"
MODEL="doubao-seedream-5-0-260128"
DIR="$(cd "$(dirname "$0")" && pwd)"

STYLE="children's picture-book illustration, soft warm colors, gentle rounded shapes, bright and cheerful, wholesome, high quality, no text"

declare -a NAMES=(mascot hero nature arts music story food)
declare -a PROMPTS=(
"A cute friendly cartoon baby brown bear cub mascot wearing a little sky-blue scarf, waving one paw, big happy smile, standing pose, clean solid pale background, mascot logo character for a kids brand. ${STYLE}"
"A bright cheerful bilingual preschool classroom, a diverse group of happy 3 to 5 year old children playing together, both Chinese and Western kids, a kind teacher kneeling among them, big windows showing tall evergreen pine trees of Seattle, warm morning sunlight, colorful play mats and toys. ${STYLE}"
"Young preschool children exploring a Pacific Northwest forest trail, tall evergreen trees, kids holding magnifying glasses looking curiously at leaves and a small log, a gentle teacher guiding them, dappled sunlight, wholesome outdoor adventure. ${STYLE}"
"A few happy preschoolers doing arts and crafts at a low wooden table, painting on paper with bright colors, little hands joyfully messy with paint, colorful artwork pinned on the wall behind, cozy sunny classroom. ${STYLE}"
"Circle time at a preschool: a small group of toddlers sitting on a colorful round rug playing little percussion instruments and singing, a smiling teacher with a tambourine leading them, music notes floating in the air, joyful and lively. ${STYLE}"
"Cozy bilingual story time corner: a warm teacher reading an open picture book to a small group of attentive happy toddlers sitting on cushions, a bookshelf full of colorful Chinese and English children's books behind them, soft reading-nook lighting. ${STYLE}"
"A fun children's food-culture activity: little kids wearing small aprons and chef hats happily making colorful dumplings and arranging healthy fruits and vegetables at a low table, a teacher helping, bright kitchen classroom. ${STYLE}"
)

for i in "${!NAMES[@]}"; do
  name="${NAMES[$i]}"
  prompt="${PROMPTS[$i]}"
  echo "[$((i+1))/${#NAMES[@]}] generating $name ..."
  resp=$(curl -s -X POST "$API" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $KEY" \
    -d "$(jq -nc --arg m "$MODEL" --arg p "$prompt" '{model:$m, prompt:$p, sequential_image_generation:"disabled", response_format:"url", size:"2K", stream:false, watermark:false}')")
  url=$(echo "$resp" | jq -r '.data[0].url // empty')
  if [ -z "$url" ]; then
    echo "  !! no url for $name. response: $resp"
    continue
  fi
  echo "  downloading -> $DIR/$name.jpg"
  curl -s -o "$DIR/$name.jpg" "$url"
  echo "  done $name ($(wc -c < "$DIR/$name.jpg") bytes)"
done
echo "ALL DONE"
