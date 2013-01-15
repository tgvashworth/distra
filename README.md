# distra

Use distra to give serve static directories while developing, and to give servers running on your computer nice URLs.

Set up hosts (urls) and routes (directories or proxy targets (moar urls)) using JSON, and then feel like a boss.

I had so many servers, particularly serving static files, that I never knew what was being served and on which port. So I built this, and I'll never have to care again... and neither will you.

## Install

Distra requires:

* Node
* npm

Clone the repository, tho it may be an npm module at some point.

```bash
git clone git://github.com/phuu/distra.git
cd distra && npm install
```

## Configuration

Rename the `config.sample.json` file to `config.json` and add your own setup. Any hosts you add will also need to go in your `hosts` file. On OSX, that's `/etc/hosts`.

Here's an example.

```json
{
  "mysite.dev": "localhost:4000",
  "project": "/Users/you/sites/project"
}
```

In your `hosts` file:

```
127.0.0.1 mysite.dev
127.0.0.1 project
```

In the example above, requests made to `http://mysite.dev/` will be proxied through to the server running on port 4000 (a [Jekyll](https://github.com/mojombo/jekyll) server, perhaps). Requests made to `project` will be served static files from the directory specified.

## Start

`node .`

Although, I reccommend starting on port 80 so you don't have to mess around with ports!

`sudo node . 80`

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

