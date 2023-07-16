import React from "react";
import PostMarkdown from "./PostMarkdown";
import PostCover from "./PostCover";
import { Container } from "@mui/material";

const post = `
# Introduction

This is parapgraph of introduction

## Subheading 2

hello world!

[Verse 1]
When the morning came
We were cleaning incense off your vinyl shelf
'Cause we lost track of time again
Laughing with my feet in your lap
Like you were my closest friend
"How'd we end up on the floor, anyway?" you say
"Your roommate's cheap-ass screw-top rosé, that's how"
I see you every day now

[Chorus]
And I chose you
The one I was dancing with
In New York, no shoes
Looked up at the sky and it was
The burgundy on my t-shirt
When you splashed your wine into me
And how the blood rushed into my cheeks
So scarlet, it was
The mark thеy saw on my collarbone
The rust that grew bеtween telephones
The lips I used to call home
So scarlet, it was maroon

[Verse 2]
When the silence came
We were shaking, blind and hazy
How the hell did we lose sight of us again?
Sobbing with your head in your hands
Ain't that the way shit always ends?
You were standing hollow-eyed in the hallway
Carnations you had thought were roses, that's us
I feel you, no matter what
The rubies that I gave up
See Taylor Swift Live
Get tickets as low as $125
You might also like
Hits Different
Taylor Swift
All Of The Girls You Loved Before
Taylor Swift
Lavender Haze
Taylor Swift
[Chorus]
And I lost you
The one I was dancing with
In New York, no shoes
Looked up at the sky and it was (Maroon)
The burgundy on my t-shirt
When you splashed your wine into me
And how the blood rushed into my cheeks
So scarlet, it was (Maroon)
The mark they saw on my collarbone
The rust that grew between telephones
The lips I used to call home
So scarlet, it was maroon

[Bridge]
And I wake with your memory over me
That's a real fucking legacy, legacy (It was maroon)
And I wake with your memory over me
That's a real fucking legacy to leave

[Chorus]
The burgundy on my t-shirt
When you splashed your wine into me
And how the blood rushed into my cheeks
So scarlet, it was maroon
The mark they saw on my collarbone
The rust that grew between telephones
The lips I used to call home
So scarlet, it was maroon
[Outro]
It was maroon
It was maroon
`

function PostPage() {
  return (
    <div>
      <PostCover />
      <Container>
        <PostMarkdown post={post} />
      </Container>
    </div>
  );
}

export default PostPage;
