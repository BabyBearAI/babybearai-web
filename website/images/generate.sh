#!/usr/bin/env bash
# Generates camp images via Volcano Ark (doubao-seedream) and downloads them locally.
set -uo pipefail

API="https://ark.cn-beijing.volces.com/api/v3/images/generations"
KEY="ark-194cf35b-6865-4600-85f6-0cf02ee915b8-3d5ec"
MODEL="doubao-seedream-5-0-260128"
DIR="$(cd "$(dirname "$0")" && pwd)"

STYLE="professional photograph, photorealistic, natural soft lighting, shallow depth of field, candid documentary style, warm color grading, high resolution, sharp focus, authentic real-life scene, no text, no watermark"

declare -a NAMES=(mascot hero nature arts music story food)
declare -a PROMPTS=(
"A real adorable fluffy brown bear cub photographed up close, wearing a small soft sky-blue knitted scarf, sitting and looking gently at the camera with a sweet curious expression, clean softly blurred pale studio background, heart-warming wildlife portrait. ${STYLE}"
"A bright cheerful bilingual preschool classroom, a diverse group of real happy 3 to 5 year old children playing together, both Asian and Western kids, a kind young teacher kneeling among them, big windows showing tall evergreen pine trees of Seattle, warm morning sunlight streaming in, colorful play mats and wooden toys. ${STYLE}"
"Young preschool children exploring a Pacific Northwest forest trail, tall evergreen trees, kids holding magnifying glasses looking curiously at leaves and a mossy log, a gentle teacher guiding them, dappled golden sunlight through the canopy, wholesome outdoor adventure. ${STYLE}"
"A few happy preschoolers doing arts and crafts at a low wooden table, painting on paper with bright colors, little hands joyfully messy with paint, colorful children's artwork pinned on the wall behind, cozy sunlit classroom. ${STYLE}"
"Circle time at a preschool: a small group of toddlers sitting on a colorful round rug playing little percussion instruments, a smiling teacher with a tambourine leading them in song, joyful and lively, bright airy room. ${STYLE}"
"Cozy bilingual story time corner: a warm teacher reading an open picture book to a small group of attentive happy toddlers sitting on cushions, a bookshelf full of colorful Chinese and English children's books behind them, soft golden reading-nook lighting. ${STYLE}"
"A fun children's food-culture activity: little kids wearing small aprons and chef hats happily making colorful dumplings and arranging fresh fruits and vegetables at a low table, a teacher helping them, bright clean kitchen classroom. ${STYLE}"
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
