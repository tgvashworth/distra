# distra

A proxy and static file server. Set up hosts and routes (directories or proxy targets) using json and then feel like a boss.

## Install

Clone the repo, tho it may be an npm module at some point.

`cd distra && npm install`

## Config

Rename the `config.sample.json` file to `config.json` and add your own setup. You'll also need to add any hosts to your `hosts` file. On OSX, that's `/etc/hosts`.

Here's an example.

```json
{
  "mysite.dev": "localhost:4000",
  "project": "/Users/you/sites/project"
}
```

Requests made to `mysite.dev` will be proxied through to a server running on port 4000. Those made to `project` will be served static files from the directory listed below.

## Start

I reccommend starting on port 80.

`sudo node . 80`

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

