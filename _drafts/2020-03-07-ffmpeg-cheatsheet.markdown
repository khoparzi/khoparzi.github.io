---
layout: post
title: "FFMPEG Cheatsheet"
date: "2020-03-07 08:07:39 +0530"
---

#### Overview

```
 _______              ______________
|       |            |              |
| input |  demuxer   | encoded data |   decoder
| file  | ---------> | packets      | -----+
|_______|            |______________|      |
                                           v
                                       _________
                                      |         |
                                      | decoded |
                                      | frames  |
                                      |_________|
 ________             ______________       |
|        |           |              |      |
| output | <-------- | encoded data | <----+
| file   |   muxer   | packets      |   encoder
|________|           |______________|

```

### Cheatsheet
```
ffmpeg -i input_file […parameter list…] output_file
ffmpeg <global-options> <input-options> -i <input> <output-options> <output>
```

{Input_file,output_file} <=>  {file, http, pipe, rtp/rtsp, raw udp, rtmp for all REGEX}
- Supply '-f' in  case your input file type is different from a normal file/rtsp stream.
ex- grabbing screen, "images" as input regex.
```
ffmpeg -f image2 -i image%d.jpg –r 25 video.flv
```
- ffmpeg calls the FFmpeg application in the command line window, could also be the full path to the FFmpeg binary or .exe file
- `-i` is follwed by the path to the input video
- `-c:v` sets the video codec you want to use
- Options include libx264 for H.264, libx265 for H.265/HEVC, libvpx-vp9 for VP9, and copy if you want to preserve the video codec of the input video
- `-b:v` sets the video bitrate, use a number followed by M to set value in Mbit/s, or K to set value in Kbit/s
- `-c:a` sets the audio codec you want to use Options include aac for use in combination with H.264 and H.265/HEVC, libvorbis for VP9, and copy if you want to preserve the audio codec of the input video
- `-b:a` sets the audio bitrate of the output video
- `-vf` sets so called video filters, which allow you to apply transformations on a video like scale for changing the resolution and setdar for setting an aspect ratio
- `-r` sets the frame rate of the output video
- `-pix_fmt` sets the pixel format of the output video, required for some input files and so recommended to always use and set to yuv420p for playback
- `-map` allows you to specify streams inside a file
- `-ss` seeks to the given timestamp in the format HH:MM:SS
- `-t` sets the time or duration of the output

A few examples of conversions that I might use often

### Convert Webm video from Hydra to mp4 at good quality
`ffmpeg  -i hydra.webm -preset slow -crf 22 hydra.mp4`

### Resize to certain width
`ffmpeg -i input.webm -vf scale=1280:-2 output.mp4`

### Reduce file size
`ffmpeg -i input.mp4 -vcodec libx265 -crf 20 output.mp4`

### mkv to mp4
Same codec, just another container - do not encode again!
`ffmpeg -i LostInTranslation.mkv -codec copy LostInTranslation.mp4`

### Extract to images
```
ffmpeg -i video.mpg image-%04d.jpg
```

### Speed-up video and audio
2X
```
ffmpeg -i input.mp4   -filter:v "setpts=0.5*PTS" -filter:a "atempo=2" outputX2.mp4
```

4X
```
ffmpeg -i input.mp4   -filter:v "setpts=0.25*PTS" -filter:a "atempo=2, atempo=2" outputX4.mp4
```

### Split video into X minutes chunks
```
 ffmpeg -i source-file.foo -ss 0 -t 600 first-10-min.m4v
```

<!-- From https://github.com/beyondszine/ffmpeg-cheatsheet/blob/master/README.md -->

- You can have fast, high-quality encoding, but the file will be large
- You can have high-quality, smaller file size, but the encoding will take longer
- You can have small files with fast encoding, but the quality will be bad.

```
ffmpeg -i <input> -c:v libx264 -crf 23 -preset ultrafast -an output.mkv
ffmpeg -i <input> -c:v libx264 -crf 23 -preset medium -an output.mkv
ffmpeg -i <input> -c:v libx264 -crf 23 -preset veryslow -an output.mkv
```

Transcoding: Conversion from one encoder to another.  Ex- H264 to H265
Transmuxing: Conversion from one format/Container to another.  Ex- mp4 to mkv
```sh
# Transcoding from one codec to another (e.g. H.264 using libx264):
ffmpeg -i <input> -c:v libx264 output.mp4
# Transmuxing from one container/format to another – without re-encoding:
ffmpeg -i input.mp4 -c copy output.mkv
```

### Record Screen
```sh
# just video
ffmpeg -video_size 1024x768 -framerate 25 -f x11grab -i :0 output.mp4
# for audio too, co-ordinates are passed along with screen number, i.e. 100,200.
ffmpeg -video_size 1024x768 -framerate 25 -f x11grab -i :0.0+100,200 -f alsa -ac 2 -i hw:0 output.mkv
```
### Remove audio/video
```sh
# disable audio
ffmpeg -i ibiza.mp4 -an ibiza_muted.mp4 # transcoding will be done if codecs differ.
ffmpeg -stats -i ibiza.mp4 -vn -c:a copy ibiza_novid.<container>
# disable video
ffmpeg -i ibiza.mp4 -vn ibiza_novid.mp3
```

### Mux audio + video
```sh
ffmpeg -i audio.mp4 -i video.mp4 output.mp4
```
### Grab webcam & dump
```sh
ffmpeg -f v4l2 -i /dev/video0 out.mp4
```
You can use the -ss option to specify a start timestamp, and the -t option to specify the encoding duration. The timestamps need to be in HH:MM:SS.xxx format or in seconds (s.msec).

The following would clip the first 30 seconds, and then clip everything that is 10 seconds after that:
```sh
ffmpeg -ss 00:00:30.0 -i input.wmv -c copy -t 00:00:10.0 output.wmv
ffmpeg -ss 30 -i input.wmv -c copy -t 10 output.wmv
```

### Generate random noise
```sh
ffmpeg -ar 48000 -t 60 -f s16le -acodec pcm_s16le -i /dev/u­random -ab 64K -f mp2 -acodec mp2 -y noise.mp2
```

### Add album cover
```sh
ffmpeg -i input.mp3 -i cover.png -c copy -metadata:s:v title="Album cover" -metadata:s:v comment="Cover (Front)" out.mp3
```

<!-- From https://gist.github.com/indefinit/7a61145198628b4b4df7 -->
### Image seq to mp4
An image sequence follows the pattern, defaultCanvas0-000000000.png (9 zeros)
video codec is libx264
pixel format yuv420p
output file is named out.mp4
```
ffmpeg -i 'defaultCanvas0-%9d.png' -c:v libx264 -pix_fmt yuv420p out.mp4
```

if you want your image sequence to start on a different number than index 0, use the -start_number parameter
```
ffmpeg -start_number 000000060 -i 'defaultCanvas-%9d.png' -c:v libx264 -pix_fmt yuv420p out.mp4
```

if you want to use ffmpeg to generate an animated gif from an image sequence
`-vf : video filter`
`scale=[pixels] : -1` scale the frame and preserve aspect ratio.  In this case we are scaling the width to 500px. if you want to scale the height and preserve aspect ratio, `scale=-1:500`
```
ffmpeg -start_number 000000090 -i 'defaultCanvas0-%9d.png' -vf scale=500:-1 out.gif
```

More at [FFMPEG An Intermediate Guide/image sequence](https://en.wikibooks.org/wiki/FFMPEG_An_Intermediate_Guide/image_sequence)

<!-- From https://github.com/jamesplease/ffmpeg-cheatsheet -->
### Trim Video

Trim the start of a video using `-ss {SECONDS}`. Then, specify the duration using `-t {SECONDS}`.

For instance, if you want a video that is 5 seconds long that starts at 4.5 seconds in, you would use:

```
ffmpeg -i in.mp4 -ss 4.5 -t 5 out.mp4
```

### Slow Down a Video

Slow a video using a filter. This example slows the video by four times.

```
ffmpeg -i in.mp4 -filter:v "setpts=4.0*PTS" out.mp4
```

### Scale to a Specific Width

Given a desired video width, like, 538px, you can resize a video to that width while retaining the aspect ratio
using:

```
ffmpeg -i in.mp4 -filter:v scale="538:trunc(ow/a/2)*2" -c:a copy out.mp4
```

### Crop videos

Crop a 80x60 square at position (200, 100).

```
ffmpeg -i in.mp4 -filter:v "crop=80:60:200:100" -c:a copy out.mp4
```

### Generating a Poster Image

A poster image is an image that displays while a video is loading in the browser. It is particularly
valuable for mobile devices.

To generate a representative image from the 7th second of a video, you can run this command:

```
ffmpeg -i in.mp4 -ss 00:00:07.000 -vframes 1 out.jpg
```

<!-- From https://github.com/gradywoodruff/_/blob/master/ffmpeg.md -->
### Show between second 0 and 20

	ffmpeg -i input.mp4 -i image.png \
	-filter_complex "[0:v][1:v] overlay=25:25:enable='between(t,0,20)'" \
	-pix_fmt yuv420p -c:a copy \
	output.mp4

`overlay=25:25` means we want to position the image 25px to the right and 25px down, originating from the top left corner (0:0).

`enable='between(t,0,20)'` means we want the image to show between second 0 and 20.

`[0:v][1:v]` means that we want the first video file we import with -i, in our case input.mp4 or how ffmpeg sees it video input file number 0, to be under video input file 1, in our case image.png. :v just means we want video 0 and video 1. `[0:a]` would mean we want the first imported audio track. Which would also come from input.mp4 but would point to the audio track instead of the video track in the mp4 file.

If you want a certain image quality/settings and not the settings ffmpeg chooses, add the image and or audio encoding options you want to use. The default video encoder will be x264. Check the H.264 encoding guide for possible settings.

The `-acodec copy` / `-c:a copy` that you have in your command f.e. would simply re-use the audio from the source file. Though you can't do that with the video of course (in this case), that has to be transcoded.

If you want to transcode audio, remove the `-c:a copy` part. You may have to explicitly specify an encoder, e.g. `-c:a aac -strict experimental`. See the AAC encoding guide for more info.


### Fade out

	ffmpeg -i in.mp4 -framerate 30000/1001 -loop 1 -i logo.png -filter_complex
	  "[1:v] fade=out:st=30:d=1:alpha=1 [ov]; [0:v][ov] overlay=10:10 [v]" -map "[v]"
	  -map 0:a -c:v libx264 -c:a copy -shortest out.mp4

This assumes that the logo is a single still image with an alpha channel and you want to overlay it over a video with a frame rate of 30000/1001 (NTSC rate). Change the `-framerate` to match your input video if it is different. If your logo is a video then omit `-framerate 30000/1001 -loop 1`. If the logo does not have an alpha channel, add one by inserting e.g. `format=yuva420p,` immediately before `fade`.

This will display the logo at x,y position 10,10 for 30 seconds followed by a 1 second fade out.

The reason for the `-framerate` and `-loop` for a still image is so that the fade out will work. If there is only a single frame then it has no way to fade out over a 1 second interval. Ideally it should be the same frame rate as the video so that the fade will be as smooth as possible.

### Using overlay video filter to add a logo to a video:

	ffmpeg -i video.mp4 -i logo.png -filter_complex "[0:v][1:v]overlay" \
	-codec:a copy out.mp4

To understand this command you need to know what a [stream specifier](http://ffmpeg.org/ffmpeg.html#Stream-specifiers-1) is and reading the [Introduction to FFmpeg Filtering](http://ffmpeg.org/ffmpeg-filters.html#Filtering-Introduction) will help. `[0:v]` refers to the video stream(s) of first input (`video.mp4`), and `[1:v]` refers to the video stream of the second input (`logo.mp4`). This is how you can tell `overlay` what inputs to use. You can omit [0:v][1:v], and overlay will still work, but it is recommended to be explicit and not rely on possibly unknown defaults.

By default the logo will be placed in the upper left.

Using `-codec:a copy` will [stream copy](http://ffmpeg.org/ffmpeg.html#Stream-copy) the audio. This simply re-muxes the audio instead of re-encoding it. Think of it as a "copy and paste" of the audio.

#### Moving the logo

This example will move the logo 10 pixels to the right, and 10 pixels down: enter image description here

	ffmpeg -i video.mp4 -i logo.png -filter_complex "[0:v][1:v]overlay=10:10" \
	-codec:a copy out.mp4

This example will move the logo 10 pixels from the right side and 10 pixels down:


	ffmpeg -i video.mp4 -i logo.png -filter_complex \
	"[0:v][1:v]overlay=main_w-overlay_w-10:10" -codec:a copy out.mp4

`main_w` refers to the width of the "main" input (the background or `[0:v]`), and `overlay_w` refers to the width of the "overlay" input (the logo or `[1:v]`). So, in the example, this can be translated to `overlay=320-90-10:10` or `overlay=220:10`.

#### Timing the overlay

Some filters can handle [timeline editing](http://ffmpeg.org/ffmpeg-filters.html#Timeline-editing) which allows you to use [arithmetic expressions](http://ffmpeg.org/ffmpeg-utils.html#Expression-Evaluation) to determine when a filter should be applied. Refer to `ffmpeg -filters` to see which filters support timeline editing.

This example will show the logo until 30 seconds:

	ffmpeg -i video.mp4 -i logo.png -filter_complex \
	"[0:v][1:v]overlay=10:10:enable=between(t\,0\,30)" -codec:a copy out.mp4

### Batch convert
Run in terminal

for i in *.avi; do ffmpeg -i "$i" "${i%.*}.mp4"; done


<!-- From https://github.com/linfredriksson/FFmpegCheatSheet/blob/master/cheat_sheet.txt -->
### Set start frame timecode on video
ffmpeg.exe -i video_a.mov -acodec copy -vcodec copy -timecode 01:20:30:00 video_b.mov

### Burn in tc on video
ffmpeg -i video_a.mov -vcodec mjpeg -cmp 22 -vf "drawtext=fontfile=consolab.ttf: timecode='01\:20\:30\:00': r=30: x=(w-tw)/2: y=(2*lh): fontcolor=white: box=1: boxcolor=0x00000099: fontsize=100" -y video_b.mov

### Extract one frame for every second of video
ffmpeg -i input.mov -vf fps=1 out_%04d.png

### Undistort GoPro video distortion
ffmpeg -i in.mp4 -vf "lenscorrection=cx=0.5:cy=0.5:k1=-0.227:k2=-0.022" out.mp4

### Generate gif from frames
ffmpeg -i in.avi -loop 0 out.gif

## Useful links
- [FFmpeg – the swiss army knife of Internet Streaming – part II](https://sonnati.wordpress.com/2011/08/08/ffmpeg-–-the-swiss-army-knife-of-internet-streaming-–-part-ii/)
- [FFMPEG An Intermediate Guide](https://en.wikibooks.org/wiki/FFMPEG_An_Intermediate_Guide)
- [FFmpeg Cheat Sheet for 360º video](https://gist.github.com/nickkraakman/e351f3c917ab1991b7c9339e10578049)
