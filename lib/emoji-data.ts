// Emoji data with keyword mappings for search
// Based on common emoji usage patterns from Unicode CLDR and emoogle patterns

export interface EmojiEntry {
  emoji: string;
  name: string;
  keywords: string[];
}

// Comprehensive emoji dataset with multiple keywords per emoji
export const EMOJI_DATA: EmojiEntry[] = [
  // Smileys & Emotion
  { emoji: '😀', name: 'grinning', keywords: ['smile', 'happy', 'grin', 'face', 'joy'] },
  { emoji: '😃', name: 'smiley', keywords: ['smile', 'happy', 'joy', 'face', 'grin'] },
  { emoji: '😄', name: 'smile', keywords: ['happy', 'joy', 'laugh', 'face', 'grin'] },
  { emoji: '😁', name: 'grin', keywords: ['smile', 'happy', 'teeth', 'face'] },
  { emoji: '😆', name: 'laughing', keywords: ['smile', 'happy', 'laugh', 'satisfied', 'xd'] },
  { emoji: '😅', name: 'sweat_smile', keywords: ['smile', 'nervous', 'sweat', 'relief'] },
  { emoji: '🤣', name: 'rofl', keywords: ['laugh', 'lol', 'rolling', 'floor', 'funny'] },
  { emoji: '😂', name: 'joy', keywords: ['laugh', 'cry', 'happy', 'tears', 'lol', 'funny'] },
  { emoji: '🙂', name: 'slightly_smiling', keywords: ['smile', 'happy', 'face'] },
  { emoji: '🙃', name: 'upside_down', keywords: ['smile', 'silly', 'sarcasm', 'irony'] },
  { emoji: '😉', name: 'wink', keywords: ['face', 'flirt', 'playful'] },
  { emoji: '😊', name: 'blush', keywords: ['smile', 'happy', 'shy', 'cute'] },
  { emoji: '😇', name: 'innocent', keywords: ['angel', 'halo', 'good', 'pure'] },
  { emoji: '🥰', name: 'smiling_hearts', keywords: ['love', 'hearts', 'adore', 'crush'] },
  { emoji: '😍', name: 'heart_eyes', keywords: ['love', 'crush', 'adore', 'hearts'] },
  { emoji: '🤩', name: 'star_struck', keywords: ['star', 'eyes', 'excited', 'wow', 'amazing'] },
  { emoji: '😘', name: 'kissing_heart', keywords: ['kiss', 'love', 'heart', 'flirt'] },
  { emoji: '😗', name: 'kissing', keywords: ['kiss', 'face', 'love'] },
  { emoji: '☺️', name: 'relaxed', keywords: ['smile', 'happy', 'blush', 'content'] },
  { emoji: '😚', name: 'kissing_closed_eyes', keywords: ['kiss', 'love', 'affection'] },
  { emoji: '😙', name: 'kissing_smiling_eyes', keywords: ['kiss', 'love', 'happy'] },
  { emoji: '🥲', name: 'smiling_tear', keywords: ['smile', 'cry', 'happy', 'sad', 'grateful'] },
  { emoji: '😋', name: 'yum', keywords: ['tongue', 'delicious', 'tasty', 'food'] },
  { emoji: '😛', name: 'stuck_out_tongue', keywords: ['tongue', 'playful', 'silly', 'tease'] },
  { emoji: '😜', name: 'stuck_out_tongue_winking', keywords: ['tongue', 'wink', 'playful', 'crazy'] },
  { emoji: '🤪', name: 'zany', keywords: ['crazy', 'wild', 'goofy', 'silly'] },
  { emoji: '😝', name: 'stuck_out_tongue_closed_eyes', keywords: ['tongue', 'playful', 'silly'] },
  { emoji: '🤑', name: 'money_mouth', keywords: ['money', 'dollar', 'rich', 'greedy'] },
  { emoji: '🤗', name: 'hugging', keywords: ['hug', 'embrace', 'hands', 'love'] },
  { emoji: '🤭', name: 'hand_over_mouth', keywords: ['oops', 'giggle', 'shy', 'quiet'] },
  { emoji: '🤫', name: 'shushing', keywords: ['quiet', 'shh', 'secret', 'silence'] },
  { emoji: '🤔', name: 'thinking', keywords: ['think', 'hmm', 'consider', 'question'] },
  { emoji: '🤐', name: 'zipper_mouth', keywords: ['quiet', 'secret', 'zip', 'silent'] },
  { emoji: '🤨', name: 'raised_eyebrow', keywords: ['skeptical', 'doubt', 'suspicious'] },
  { emoji: '😐', name: 'neutral', keywords: ['meh', 'indifferent', 'blank', 'straight'] },
  { emoji: '😑', name: 'expressionless', keywords: ['blank', 'meh', 'annoyed'] },
  { emoji: '😶', name: 'no_mouth', keywords: ['silent', 'speechless', 'quiet'] },
  { emoji: '😏', name: 'smirk', keywords: ['smug', 'sly', 'suggestive', 'flirt'] },
  { emoji: '😒', name: 'unamused', keywords: ['meh', 'annoyed', 'unhappy', 'bored'] },
  { emoji: '🙄', name: 'rolling_eyes', keywords: ['eyeroll', 'annoyed', 'bored', 'whatever'] },
  { emoji: '😬', name: 'grimacing', keywords: ['awkward', 'nervous', 'tense', 'yikes'] },
  { emoji: '🤥', name: 'lying', keywords: ['lie', 'pinocchio', 'nose', 'fib'] },
  { emoji: '😌', name: 'relieved', keywords: ['relief', 'calm', 'content', 'peaceful'] },
  { emoji: '😔', name: 'pensive', keywords: ['sad', 'thoughtful', 'dejected'] },
  { emoji: '😪', name: 'sleepy', keywords: ['tired', 'sleep', 'zzz', 'drowsy'] },
  { emoji: '🤤', name: 'drooling', keywords: ['drool', 'hungry', 'delicious', 'yum'] },
  { emoji: '😴', name: 'sleeping', keywords: ['sleep', 'zzz', 'tired', 'nap'] },
  { emoji: '😷', name: 'mask', keywords: ['sick', 'medical', 'covid', 'face', 'ill'] },
  { emoji: '🤒', name: 'thermometer', keywords: ['sick', 'fever', 'ill', 'temperature'] },
  { emoji: '🤕', name: 'bandage', keywords: ['hurt', 'injured', 'head', 'pain'] },
  { emoji: '🤢', name: 'nauseated', keywords: ['sick', 'green', 'vomit', 'gross'] },
  { emoji: '🤮', name: 'vomiting', keywords: ['sick', 'puke', 'throw up', 'gross'] },
  { emoji: '🤧', name: 'sneezing', keywords: ['sick', 'cold', 'tissue', 'achoo'] },
  { emoji: '🥵', name: 'hot', keywords: ['heat', 'sweat', 'warm', 'summer'] },
  { emoji: '🥶', name: 'cold', keywords: ['freeze', 'ice', 'winter', 'freezing'] },
  { emoji: '🥴', name: 'woozy', keywords: ['drunk', 'dizzy', 'tipsy', 'confused'] },
  { emoji: '😵', name: 'dizzy', keywords: ['dead', 'knocked out', 'unconscious'] },
  { emoji: '🤯', name: 'exploding_head', keywords: ['mind blown', 'shocked', 'amazed'] },
  { emoji: '🤠', name: 'cowboy', keywords: ['hat', 'western', 'yeehaw', 'country'] },
  { emoji: '🥳', name: 'partying', keywords: ['party', 'celebrate', 'birthday', 'fun'] },
  { emoji: '🥸', name: 'disguised', keywords: ['glasses', 'nose', 'mustache', 'incognito'] },
  { emoji: '😎', name: 'sunglasses', keywords: ['cool', 'sun', 'shades', 'chill'] },
  { emoji: '🤓', name: 'nerd', keywords: ['geek', 'glasses', 'smart', 'study'] },
  { emoji: '🧐', name: 'monocle', keywords: ['inspect', 'curious', 'hmm', 'fancy'] },
  { emoji: '😕', name: 'confused', keywords: ['puzzled', 'unsure', 'what'] },
  { emoji: '😟', name: 'worried', keywords: ['concern', 'anxious', 'nervous'] },
  { emoji: '🙁', name: 'slightly_frowning', keywords: ['sad', 'disappointed', 'frown'] },
  { emoji: '☹️', name: 'frowning', keywords: ['sad', 'unhappy', 'frown'] },
  { emoji: '😮', name: 'open_mouth', keywords: ['wow', 'surprised', 'shocked', 'gasp'] },
  { emoji: '😯', name: 'hushed', keywords: ['surprised', 'quiet', 'wow'] },
  { emoji: '😲', name: 'astonished', keywords: ['shocked', 'surprised', 'wow', 'amazed'] },
  { emoji: '😳', name: 'flushed', keywords: ['embarrassed', 'shy', 'blush', 'red'] },
  { emoji: '🥺', name: 'pleading', keywords: ['puppy', 'eyes', 'please', 'cute', 'beg'] },
  { emoji: '😦', name: 'frowning_open_mouth', keywords: ['aw', 'sad', 'surprised'] },
  { emoji: '😧', name: 'anguished', keywords: ['distressed', 'worried', 'shocked'] },
  { emoji: '😨', name: 'fearful', keywords: ['scared', 'afraid', 'fear', 'shock'] },
  { emoji: '😰', name: 'anxious', keywords: ['nervous', 'worried', 'sweat', 'fear'] },
  { emoji: '😥', name: 'sad_relieved', keywords: ['sad', 'sweat', 'disappointed'] },
  { emoji: '😢', name: 'cry', keywords: ['sad', 'tear', 'crying', 'unhappy'] },
  { emoji: '😭', name: 'sob', keywords: ['cry', 'sad', 'tears', 'wail', 'bawl'] },
  { emoji: '😱', name: 'scream', keywords: ['scared', 'fear', 'horror', 'shocked'] },
  { emoji: '😖', name: 'confounded', keywords: ['frustrated', 'quivering', 'upset'] },
  { emoji: '😣', name: 'persevere', keywords: ['struggle', 'frustrated', 'trying'] },
  { emoji: '😞', name: 'disappointed', keywords: ['sad', 'let down', 'unhappy'] },
  { emoji: '😓', name: 'downcast_sweat', keywords: ['sad', 'tired', 'defeated'] },
  { emoji: '😩', name: 'weary', keywords: ['tired', 'frustrated', 'fed up'] },
  { emoji: '😫', name: 'tired', keywords: ['exhausted', 'frustrated', 'sleepy'] },
  { emoji: '🥱', name: 'yawning', keywords: ['tired', 'sleepy', 'bored', 'yawn'] },
  { emoji: '😤', name: 'triumph', keywords: ['angry', 'proud', 'frustrated', 'huffing'] },
  { emoji: '😡', name: 'rage', keywords: ['angry', 'mad', 'furious', 'red'] },
  { emoji: '😠', name: 'angry', keywords: ['mad', 'annoyed', 'grumpy'] },
  { emoji: '🤬', name: 'cursing', keywords: ['swear', 'angry', 'symbols', 'mad'] },
  { emoji: '😈', name: 'smiling_imp', keywords: ['devil', 'evil', 'horns', 'mischief'] },
  { emoji: '👿', name: 'imp', keywords: ['devil', 'angry', 'evil', 'horns'] },
  { emoji: '💀', name: 'skull', keywords: ['dead', 'death', 'skeleton', 'danger'] },
  { emoji: '☠️', name: 'skull_crossbones', keywords: ['dead', 'death', 'poison', 'pirate'] },
  { emoji: '💩', name: 'poop', keywords: ['poo', 'shit', 'crap', 'hankey'] },
  { emoji: '🤡', name: 'clown', keywords: ['face', 'circus', 'joker', 'funny'] },
  { emoji: '👹', name: 'ogre', keywords: ['monster', 'red', 'mask', 'demon'] },
  { emoji: '👺', name: 'goblin', keywords: ['monster', 'red', 'mask', 'tengu'] },
  { emoji: '👻', name: 'ghost', keywords: ['halloween', 'spooky', 'spirit', 'boo'] },
  { emoji: '👽', name: 'alien', keywords: ['ufo', 'space', 'extraterrestrial', 'et'] },
  { emoji: '👾', name: 'space_invader', keywords: ['alien', 'game', 'monster', 'pixel'] },
  { emoji: '🤖', name: 'robot', keywords: ['bot', 'machine', 'ai', 'face'] },
  { emoji: '😺', name: 'smiley_cat', keywords: ['cat', 'happy', 'smile', 'face'] },
  { emoji: '😸', name: 'smile_cat', keywords: ['cat', 'happy', 'grin'] },
  { emoji: '😹', name: 'joy_cat', keywords: ['cat', 'laugh', 'happy', 'tears'] },
  { emoji: '😻', name: 'heart_eyes_cat', keywords: ['cat', 'love', 'hearts'] },
  { emoji: '😼', name: 'smirk_cat', keywords: ['cat', 'smug', 'sly'] },
  { emoji: '😽', name: 'kissing_cat', keywords: ['cat', 'kiss', 'love'] },
  { emoji: '🙀', name: 'scream_cat', keywords: ['cat', 'scared', 'shocked', 'weary'] },
  { emoji: '😿', name: 'crying_cat', keywords: ['cat', 'sad', 'tear'] },
  { emoji: '😾', name: 'pouting_cat', keywords: ['cat', 'angry', 'grumpy'] },
  { emoji: '🙈', name: 'see_no_evil', keywords: ['monkey', 'eyes', 'hide', 'blind'] },
  { emoji: '🙉', name: 'hear_no_evil', keywords: ['monkey', 'ears', 'deaf'] },
  { emoji: '🙊', name: 'speak_no_evil', keywords: ['monkey', 'mouth', 'mute', 'quiet'] },
  
  // Gestures & Body
  { emoji: '👋', name: 'wave', keywords: ['hand', 'hello', 'hi', 'bye', 'goodbye'] },
  { emoji: '🤚', name: 'raised_back_of_hand', keywords: ['hand', 'stop', 'backhand'] },
  { emoji: '🖐️', name: 'hand_splayed', keywords: ['hand', 'five', 'stop', 'high five'] },
  { emoji: '✋', name: 'raised_hand', keywords: ['hand', 'stop', 'high five', 'five'] },
  { emoji: '🖖', name: 'vulcan', keywords: ['spock', 'star trek', 'live long'] },
  { emoji: '👌', name: 'ok_hand', keywords: ['okay', 'perfect', 'good', 'nice'] },
  { emoji: '🤌', name: 'pinched_fingers', keywords: ['italian', 'chef kiss', 'perfection'] },
  { emoji: '🤏', name: 'pinching', keywords: ['small', 'little', 'tiny', 'bit'] },
  { emoji: '✌️', name: 'peace', keywords: ['victory', 'two', 'v', 'hand'] },
  { emoji: '🤞', name: 'crossed_fingers', keywords: ['luck', 'hope', 'fingers crossed'] },
  { emoji: '🤟', name: 'love_you', keywords: ['hand', 'ily', 'rock', 'sign'] },
  { emoji: '🤘', name: 'metal', keywords: ['rock', 'horns', 'devil', 'hand'] },
  { emoji: '🤙', name: 'call_me', keywords: ['phone', 'shaka', 'hang loose'] },
  { emoji: '👈', name: 'point_left', keywords: ['hand', 'direction', 'left'] },
  { emoji: '👉', name: 'point_right', keywords: ['hand', 'direction', 'right'] },
  { emoji: '👆', name: 'point_up', keywords: ['hand', 'direction', 'up', 'above'] },
  { emoji: '🖕', name: 'middle_finger', keywords: ['hand', 'finger', 'fu'] },
  { emoji: '👇', name: 'point_down', keywords: ['hand', 'direction', 'down', 'below'] },
  { emoji: '☝️', name: 'point_up_2', keywords: ['hand', 'one', 'direction'] },
  { emoji: '👍', name: 'thumbsup', keywords: ['good', 'like', 'approve', 'yes', 'ok'] },
  { emoji: '👎', name: 'thumbsdown', keywords: ['bad', 'dislike', 'no', 'disapprove'] },
  { emoji: '✊', name: 'fist', keywords: ['punch', 'power', 'fight', 'resist'] },
  { emoji: '👊', name: 'punch', keywords: ['fist', 'bump', 'fight', 'attack'] },
  { emoji: '🤛', name: 'left_fist', keywords: ['fist bump', 'punch'] },
  { emoji: '🤜', name: 'right_fist', keywords: ['fist bump', 'punch'] },
  { emoji: '👏', name: 'clap', keywords: ['applause', 'hands', 'congrats', 'bravo'] },
  { emoji: '🙌', name: 'raised_hands', keywords: ['celebrate', 'hooray', 'yay', 'praise'] },
  { emoji: '👐', name: 'open_hands', keywords: ['hands', 'jazz', 'open'] },
  { emoji: '🤲', name: 'palms_up', keywords: ['hands', 'pray', 'cupped'] },
  { emoji: '🤝', name: 'handshake', keywords: ['deal', 'agree', 'meeting'] },
  { emoji: '🙏', name: 'pray', keywords: ['please', 'hope', 'wish', 'thanks', 'namaste'] },
  { emoji: '✍️', name: 'writing', keywords: ['hand', 'write', 'pen'] },
  { emoji: '💪', name: 'muscle', keywords: ['strong', 'arm', 'flex', 'bicep', 'workout'] },
  
  // Hearts & Love
  { emoji: '❤️', name: 'heart', keywords: ['love', 'red', 'valentine'] },
  { emoji: '🧡', name: 'orange_heart', keywords: ['love', 'orange'] },
  { emoji: '💛', name: 'yellow_heart', keywords: ['love', 'yellow', 'friendship'] },
  { emoji: '💚', name: 'green_heart', keywords: ['love', 'green', 'jealous'] },
  { emoji: '💙', name: 'blue_heart', keywords: ['love', 'blue', 'trust'] },
  { emoji: '💜', name: 'purple_heart', keywords: ['love', 'purple'] },
  { emoji: '🖤', name: 'black_heart', keywords: ['love', 'black', 'dark'] },
  { emoji: '🤍', name: 'white_heart', keywords: ['love', 'white', 'pure'] },
  { emoji: '🤎', name: 'brown_heart', keywords: ['love', 'brown'] },
  { emoji: '💔', name: 'broken_heart', keywords: ['sad', 'heartbreak', 'love'] },
  { emoji: '❣️', name: 'heart_exclamation', keywords: ['love', 'emphasis'] },
  { emoji: '💕', name: 'two_hearts', keywords: ['love', 'pair', 'couple'] },
  { emoji: '💞', name: 'revolving_hearts', keywords: ['love', 'spinning'] },
  { emoji: '💓', name: 'heartbeat', keywords: ['love', 'beating', 'pulse'] },
  { emoji: '💗', name: 'heartpulse', keywords: ['love', 'growing'] },
  { emoji: '💖', name: 'sparkling_heart', keywords: ['love', 'sparkle', 'shine'] },
  { emoji: '💘', name: 'cupid', keywords: ['love', 'arrow', 'heart', 'valentine'] },
  { emoji: '💝', name: 'gift_heart', keywords: ['love', 'present', 'ribbon'] },
  { emoji: '💟', name: 'heart_decoration', keywords: ['love', 'purple'] },
  { emoji: '💋', name: 'kiss_mark', keywords: ['kiss', 'lips', 'love', 'lipstick'] },
  { emoji: '💌', name: 'love_letter', keywords: ['email', 'heart', 'envelope', 'letter'] },
  
  // Celebrations & Objects
  { emoji: '🎉', name: 'tada', keywords: ['party', 'celebrate', 'hooray', 'confetti'] },
  { emoji: '🎊', name: 'confetti_ball', keywords: ['party', 'celebrate', 'festival'] },
  { emoji: '🎈', name: 'balloon', keywords: ['party', 'birthday', 'celebrate'] },
  { emoji: '🎁', name: 'gift', keywords: ['present', 'birthday', 'christmas'] },
  { emoji: '🎂', name: 'birthday', keywords: ['cake', 'party', 'celebrate'] },
  { emoji: '🎄', name: 'christmas_tree', keywords: ['holiday', 'xmas', 'december'] },
  { emoji: '🎃', name: 'jack_o_lantern', keywords: ['halloween', 'pumpkin', 'october'] },
  { emoji: '✨', name: 'sparkles', keywords: ['star', 'shine', 'glitter', 'magic'] },
  { emoji: '🌟', name: 'star2', keywords: ['glow', 'shine', 'night'] },
  { emoji: '⭐', name: 'star', keywords: ['favorite', 'rating', 'yellow'] },
  { emoji: '🔥', name: 'fire', keywords: ['hot', 'flame', 'lit', 'burn'] },
  { emoji: '💯', name: '100', keywords: ['hundred', 'perfect', 'score', 'percent'] },
  { emoji: '💢', name: 'anger', keywords: ['angry', 'mad', 'symbol'] },
  { emoji: '💥', name: 'boom', keywords: ['explosion', 'collision', 'bang'] },
  { emoji: '💫', name: 'dizzy_star', keywords: ['star', 'sparkle', 'shoot'] },
  { emoji: '💦', name: 'sweat_drops', keywords: ['water', 'wet', 'workout'] },
  { emoji: '💨', name: 'dash', keywords: ['wind', 'fast', 'running', 'air'] },
  { emoji: '🕳️', name: 'hole', keywords: ['black', 'empty', 'void'] },
  { emoji: '💣', name: 'bomb', keywords: ['boom', 'explosive'] },
  { emoji: '💬', name: 'speech_balloon', keywords: ['chat', 'message', 'talk', 'comment'] },
  { emoji: '👁️‍🗨️', name: 'eye_speech', keywords: ['witness', 'see', 'talk'] },
  { emoji: '🗨️', name: 'left_speech', keywords: ['chat', 'talk', 'message'] },
  { emoji: '🗯️', name: 'right_anger', keywords: ['angry', 'mad', 'speech'] },
  { emoji: '💭', name: 'thought_balloon', keywords: ['think', 'thought', 'bubble'] },
  { emoji: '💤', name: 'zzz', keywords: ['sleep', 'tired', 'snore'] },
  
  // Nature & Weather
  { emoji: '☀️', name: 'sunny', keywords: ['sun', 'bright', 'weather', 'hot'] },
  { emoji: '🌤️', name: 'partly_sunny', keywords: ['sun', 'cloud', 'weather'] },
  { emoji: '⛅', name: 'partly_cloudy', keywords: ['sun', 'cloud', 'weather'] },
  { emoji: '🌥️', name: 'mostly_cloudy', keywords: ['sun', 'cloud', 'weather'] },
  { emoji: '☁️', name: 'cloud', keywords: ['weather', 'sky', 'cloudy'] },
  { emoji: '🌦️', name: 'sun_rain', keywords: ['weather', 'rain', 'shower'] },
  { emoji: '🌧️', name: 'rain', keywords: ['weather', 'rainy', 'cloud'] },
  { emoji: '⛈️', name: 'thunder_rain', keywords: ['storm', 'weather', 'lightning'] },
  { emoji: '🌩️', name: 'lightning', keywords: ['thunder', 'storm', 'weather'] },
  { emoji: '🌨️', name: 'snow_cloud', keywords: ['winter', 'weather', 'cold'] },
  { emoji: '❄️', name: 'snowflake', keywords: ['winter', 'cold', 'ice', 'snow'] },
  { emoji: '🌪️', name: 'tornado', keywords: ['storm', 'weather', 'twister'] },
  { emoji: '🌈', name: 'rainbow', keywords: ['colorful', 'weather', 'pride'] },
  { emoji: '🌊', name: 'wave', keywords: ['water', 'ocean', 'sea', 'surf'] },
  { emoji: '🌙', name: 'moon', keywords: ['night', 'crescent', 'sleep'] },
  { emoji: '🌝', name: 'full_moon_face', keywords: ['moon', 'night', 'creepy'] },
  { emoji: '🌚', name: 'new_moon_face', keywords: ['moon', 'night', 'dark'] },
  
  // Food & Drink
  { emoji: '🍕', name: 'pizza', keywords: ['food', 'italian', 'slice'] },
  { emoji: '🍔', name: 'hamburger', keywords: ['food', 'burger', 'fast food'] },
  { emoji: '🍟', name: 'fries', keywords: ['food', 'french fries', 'fast food'] },
  { emoji: '🌭', name: 'hotdog', keywords: ['food', 'sausage'] },
  { emoji: '🍿', name: 'popcorn', keywords: ['food', 'movie', 'snack'] },
  { emoji: '🍩', name: 'doughnut', keywords: ['food', 'donut', 'dessert', 'sweet'] },
  { emoji: '🍪', name: 'cookie', keywords: ['food', 'dessert', 'sweet', 'biscuit'] },
  { emoji: '🎂', name: 'birthday_cake', keywords: ['food', 'dessert', 'party'] },
  { emoji: '🍰', name: 'cake', keywords: ['food', 'dessert', 'sweet', 'slice'] },
  { emoji: '🍫', name: 'chocolate', keywords: ['food', 'dessert', 'sweet', 'candy'] },
  { emoji: '🍬', name: 'candy', keywords: ['food', 'sweet', 'dessert'] },
  { emoji: '🍭', name: 'lollipop', keywords: ['food', 'sweet', 'candy'] },
  { emoji: '☕', name: 'coffee', keywords: ['drink', 'cafe', 'espresso', 'hot'] },
  { emoji: '🍵', name: 'tea', keywords: ['drink', 'hot', 'green', 'cup'] },
  { emoji: '🍺', name: 'beer', keywords: ['drink', 'alcohol', 'mug', 'bar'] },
  { emoji: '🍻', name: 'beers', keywords: ['drink', 'alcohol', 'cheers', 'toast'] },
  { emoji: '🥂', name: 'champagne', keywords: ['drink', 'alcohol', 'toast', 'celebrate'] },
  { emoji: '🍷', name: 'wine', keywords: ['drink', 'alcohol', 'glass', 'red'] },
  { emoji: '🥤', name: 'cup_straw', keywords: ['drink', 'soda', 'beverage'] },
  { emoji: '🧃', name: 'juice_box', keywords: ['drink', 'beverage', 'juice'] },
  
  // Animals
  { emoji: '🐶', name: 'dog', keywords: ['animal', 'pet', 'puppy', 'cute'] },
  { emoji: '🐱', name: 'cat', keywords: ['animal', 'pet', 'kitten', 'cute'] },
  { emoji: '🐭', name: 'mouse', keywords: ['animal', 'rodent', 'cute'] },
  { emoji: '🐹', name: 'hamster', keywords: ['animal', 'pet', 'rodent', 'cute'] },
  { emoji: '🐰', name: 'rabbit', keywords: ['animal', 'bunny', 'pet', 'cute'] },
  { emoji: '🦊', name: 'fox', keywords: ['animal', 'face', 'cute'] },
  { emoji: '🐻', name: 'bear', keywords: ['animal', 'teddy', 'cute'] },
  { emoji: '🐼', name: 'panda', keywords: ['animal', 'bear', 'cute', 'china'] },
  { emoji: '🐨', name: 'koala', keywords: ['animal', 'cute', 'australia'] },
  { emoji: '🐯', name: 'tiger', keywords: ['animal', 'cat', 'wild'] },
  { emoji: '🦁', name: 'lion', keywords: ['animal', 'king', 'wild', 'cat'] },
  { emoji: '🐮', name: 'cow', keywords: ['animal', 'farm', 'moo'] },
  { emoji: '🐷', name: 'pig', keywords: ['animal', 'farm', 'oink'] },
  { emoji: '🐸', name: 'frog', keywords: ['animal', 'toad', 'ribbit'] },
  { emoji: '🐵', name: 'monkey_face', keywords: ['animal', 'ape', 'primate'] },
  { emoji: '🐔', name: 'chicken', keywords: ['animal', 'bird', 'farm', 'hen'] },
  { emoji: '🐧', name: 'penguin', keywords: ['animal', 'bird', 'cold'] },
  { emoji: '🐦', name: 'bird', keywords: ['animal', 'tweet', 'fly'] },
  { emoji: '🦄', name: 'unicorn', keywords: ['animal', 'horse', 'magic', 'fantasy'] },
  { emoji: '🐝', name: 'bee', keywords: ['animal', 'insect', 'honey', 'buzz'] },
  { emoji: '🦋', name: 'butterfly', keywords: ['animal', 'insect', 'pretty'] },
  { emoji: '🐢', name: 'turtle', keywords: ['animal', 'slow', 'shell'] },
  { emoji: '🐍', name: 'snake', keywords: ['animal', 'reptile', 'hiss'] },
  { emoji: '🦈', name: 'shark', keywords: ['animal', 'fish', 'ocean', 'jaws'] },
  { emoji: '🐙', name: 'octopus', keywords: ['animal', 'ocean', 'tentacles'] },
  { emoji: '🦀', name: 'crab', keywords: ['animal', 'ocean', 'beach'] },
  
  // Misc symbols
  { emoji: '✅', name: 'check', keywords: ['yes', 'done', 'complete', 'green'] },
  { emoji: '❌', name: 'x', keywords: ['no', 'wrong', 'error', 'cross'] },
  { emoji: '❓', name: 'question', keywords: ['what', 'help', 'red'] },
  { emoji: '❗', name: 'exclamation', keywords: ['important', 'warning', 'red'] },
  { emoji: '⚠️', name: 'warning', keywords: ['caution', 'alert', 'danger'] },
  { emoji: '🚫', name: 'no_entry', keywords: ['forbidden', 'stop', 'ban'] },
  { emoji: '🔴', name: 'red_circle', keywords: ['circle', 'dot', 'red'] },
  { emoji: '🟢', name: 'green_circle', keywords: ['circle', 'dot', 'green'] },
  { emoji: '🔵', name: 'blue_circle', keywords: ['circle', 'dot', 'blue'] },
  { emoji: '⬛', name: 'black_square', keywords: ['square', 'dark'] },
  { emoji: '⬜', name: 'white_square', keywords: ['square', 'light'] },
  { emoji: '▶️', name: 'play', keywords: ['video', 'start', 'arrow'] },
  { emoji: '⏸️', name: 'pause', keywords: ['video', 'stop'] },
  { emoji: '⏹️', name: 'stop', keywords: ['video', 'end'] },
  { emoji: '🔊', name: 'loud_sound', keywords: ['volume', 'speaker', 'audio'] },
  { emoji: '🔇', name: 'mute', keywords: ['volume', 'silent', 'quiet'] },
  { emoji: '🔔', name: 'bell', keywords: ['notification', 'alert', 'ring'] },
  { emoji: '🔕', name: 'no_bell', keywords: ['notification', 'mute', 'silent'] },
  { emoji: '📱', name: 'phone', keywords: ['mobile', 'cell', 'iphone', 'call'] },
  { emoji: '💻', name: 'laptop', keywords: ['computer', 'mac', 'pc', 'work'] },
  { emoji: '🖥️', name: 'desktop', keywords: ['computer', 'monitor', 'screen'] },
  { emoji: '📧', name: 'email', keywords: ['mail', 'message', 'envelope'] },
  { emoji: '📅', name: 'calendar', keywords: ['date', 'schedule', 'event'] },
  { emoji: '📍', name: 'pin', keywords: ['location', 'map', 'place'] },
  { emoji: '🔗', name: 'link', keywords: ['url', 'chain', 'connection'] },
  { emoji: '🔒', name: 'lock', keywords: ['secure', 'private', 'closed'] },
  { emoji: '🔓', name: 'unlock', keywords: ['open', 'access'] },
  { emoji: '🔑', name: 'key', keywords: ['password', 'access', 'lock'] },
  { emoji: '💡', name: 'bulb', keywords: ['idea', 'light', 'bright'] },
  { emoji: '🔧', name: 'wrench', keywords: ['tool', 'fix', 'settings'] },
  { emoji: '⚙️', name: 'gear', keywords: ['settings', 'cog', 'config'] },
  { emoji: '📎', name: 'paperclip', keywords: ['attach', 'attachment', 'clip'] },
  { emoji: '📌', name: 'pushpin', keywords: ['pin', 'location', 'note'] },
  { emoji: '📝', name: 'memo', keywords: ['note', 'write', 'document'] },
  { emoji: '📁', name: 'folder', keywords: ['file', 'directory'] },
  { emoji: '🗑️', name: 'trash', keywords: ['delete', 'bin', 'garbage'] },
  { emoji: '🏠', name: 'house', keywords: ['home', 'building'] },
  { emoji: '🏢', name: 'office', keywords: ['building', 'work', 'company'] },
  { emoji: '🚗', name: 'car', keywords: ['auto', 'vehicle', 'drive'] },
  { emoji: '✈️', name: 'airplane', keywords: ['fly', 'travel', 'flight'] },
  { emoji: '🚀', name: 'rocket', keywords: ['space', 'launch', 'fast', 'ship'] },
  { emoji: '⏰', name: 'alarm', keywords: ['clock', 'time', 'wake'] },
  { emoji: '⌛', name: 'hourglass', keywords: ['time', 'wait', 'sand'] },
  { emoji: '⏳', name: 'hourglass_flowing', keywords: ['time', 'wait', 'sand', 'pending'] },
];

/**
 * Search emojis by query string
 * Matches against emoji name and all keywords
 * Returns results sorted by relevance (name match first, then keyword match)
 */
export function searchEmojis(query: string, limit: number = 50): EmojiEntry[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Score each emoji based on match quality
  const scored = EMOJI_DATA.map(entry => {
    let score = 0;
    const nameLower = entry.name.toLowerCase();
    
    // Exact name match - highest priority
    if (nameLower === normalizedQuery) {
      score = 100;
    }
    // Name starts with query - high priority
    else if (nameLower.startsWith(normalizedQuery)) {
      score = 80;
    }
    // Name contains query
    else if (nameLower.includes(normalizedQuery)) {
      score = 60;
    }
    // Check keywords
    else {
      for (const keyword of entry.keywords) {
        const keywordLower = keyword.toLowerCase();
        if (keywordLower === normalizedQuery) {
          score = Math.max(score, 50);
        } else if (keywordLower.startsWith(normalizedQuery)) {
          score = Math.max(score, 40);
        } else if (keywordLower.includes(normalizedQuery)) {
          score = Math.max(score, 20);
        }
      }
    }
    
    return { entry, score };
  });
  
  // Filter out non-matches and sort by score
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.entry);
}

