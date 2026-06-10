#!/usr/bin/env bash
# Generates camp images via Volcano Ark (doubao-seedream) and downloads them locally.
set -uo pipefail

API="https://ark.cn-beijing.volces.com/api/v3/images/generations"
KEY="ark-194cf35b-6865-4600-85f6-0cf02ee915b8-3d5ec"
MODEL="doubao-seedream-5-0-260128"
DIR="$(cd "$(dirname "$0")" && pwd)"

STYLE="professional photograph, photorealistic, natural soft lighting, shallow depth of field, candid documentary style, warm color grading, high resolution, sharp focus, authentic real-life scene, no text, no watermark"

#            0:mascot 1:hero    2:banner1  3:banner2  4:nature 5:arts 6:music 7:story 8:food
declare -a NAMES=(mascot hero banner1 banner2 nature arts music story food)
declare -a SIZES=("2K" "2560x1440" "2560x1440" "2560x1440" "2K" "2K" "2K" "2K" "2K")
declare -a PROMPTS=(
"A real adorable fluffy brown bear cub photographed up close, wearing a small soft sky-blue knitted scarf, sitting and looking gently at the camera with a sweet curious expression, clean softly blurred pale studio background, heart-warming wildlife portrait. ${STYLE}"
"A breathtaking wide cinematic establishing shot of a sunlit clearing in a tall Pacific Northwest evergreen forest near Seattle, golden morning light and soft mist drifting between giant pine and fir trees, a few small young children in the distance exploring a winding natural path, vast and majestic, lots of open atmospheric sky at the top of the frame, ultra-wide 16:9 cinematic composition, grandeur and depth. ${STYLE}"
"A majestic ultra-wide cinematic landscape of misty layered Pacific Northwest evergreen mountains and forest at golden hour, rolling fog between ridges of tall fir and pine trees, serene and grand, vast soft luminous sky, no people, deep atmospheric depth, 16:9 cinematic wide establishing shot. ${STYLE}"
"A warm wide cinematic interior of a beautiful light-filled bilingual preschool, soft golden afternoon sunlight streaming through tall windows onto natural wood floors and green plants, a few happy young children playing with wooden toys in the distance, spacious airy and elegant, gentle negative space, 16:9 cinematic composition. ${STYLE}"
"Young preschool children exploring a Pacific Northwest forest trail, tall evergreen trees, kids holding magnifying glasses looking curiously at leaves and a mossy log, a gentle teacher guiding them, dappled golden sunlight through the canopy, wholesome outdoor adventure. ${STYLE}"
"A few happy preschoolers doing arts and crafts at a low wooden table, painting on paper with bright colors, little hands joyfully messy with paint, colorful children's artwork pinned on the wall behind, cozy sunlit classroom. ${STYLE}"
"Circle time at a preschool: a small group of toddlers sitting on a colorful round rug playing little percussion instruments, a smiling teacher with a tambourine leading them in song, joyful and lively, bright airy room. ${STYLE}"
"Cozy bilingual story time corner: a warm teacher reading an open picture book to a small group of attentive happy toddlers sitting on cushions, a bookshelf full of colorful Chinese and English children's books behind them, soft golden reading-nook lighting. ${STYLE}"
"A fun children's food-culture activity: little kids wearing small aprons and chef hats happily making colorful dumplings and arranging fresh fruits and vegetables at a low table, a teacher helping them, bright clean kitchen classroom. ${STYLE}"
)

# Optional: pass image names as args to regenerate only those (e.g. `bash generate.sh hero banner1`)
WANT=("$@")
want() { [ ${#WANT[@]} -eq 0 ] && return 0; for w in "${WANT[@]}"; do [ "$w" = "$1" ] && return 0; done; return 1; }

for i in "${!NAMES[@]}"; do
  name="${NAMES[$i]}"
  want "$name" || continue
  prompt="${PROMPTS[$i]}"
  size="${SIZES[$i]}"
  echo "[$((i+1))/${#NAMES[@]}] generating $name ($size) ..."
  resp=$(curl -s -X POST "$API" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $KEY" \
    -d "$(jq -nc --arg m "$MODEL" --arg p "$prompt" --arg s "$size" '{model:$m, prompt:$p, sequential_image_generation:"disabled", response_format:"url", size:$s, stream:false, watermark:false}')")
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
