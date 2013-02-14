# distra

distra is a tool for building websites.

Use it to serve static files and directories, and, for more complex stuff, to give servers running on your computer nice URLs.

Set up hosts and routes (directories or proxy targets (moar urls)) using JSON, and then feel like a boss.

It also adds to your hosts file (safely) so you never have worry about that either!

### Why?

I had so many servers, particularly serving static files, that I never knew what was being served and on which port. So I built this so I'd never have to care again... and neither will you.

## Install

Distra requires:

* OS X (yeah, sorry)
* Node
* npm

```bash
npm install -g distra
distra
```

Wahey! You're up.

But it won't do much yet – you need to configure it.

## Configuration

Distra is configured from the `.distra.json` file in your home directory, but you don't ever have to touch this file if you don't want to.

### Adding a host

To add a host, use `distra add`.

```bash
distra add [host] [directory or url]
```

The `host` and `directory or url` are both optional. If you omit the `directory or url` distra will serve the current directory you are in from the using the `host` you specify.

If you omit both, distra will serve the current directory with the name of the directory as the host.

#### Try it:

Head to a directory with some `.html` files in it, lets say it's called `website`.

```bash
distra add
```

Assuming distra is started (just use `distra`), you will find that you can go to `http://website:9876/` and access those files.

### Removing a host

To remove a host, use `distra rm`.

```bash
distra rm [host]
```

### The config file

The config file will generally be found at `~/.distra.json`.

Here's an example.

```json
{
  "mysite.dev":   "localhost:4000",
  "project":      "/Users/you/sites/project"
}
```

In the example above, requests made to `http://mysite.dev/` will be proxied through to the server running on port 4000 (a [Jekyll](https://github.com/mojombo/jekyll) server, perhaps). Requests made to `project` will be served static files from the directory specified.

## Tips

### Ports

You can specify the port on which you want distra to start.

`distra 1337`

### Portsaway!

I recommend starting on port 80 so you don't have to mess around with ports!

`sudo distra 80`

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

