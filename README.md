# HTML IDREF Attribute Link

Navigate seamlessly from HTML attributes like  `for` attributes to their target elements with Go to Definition support.

## Features

This extension adds "Go to Definition" functionality for HTML `for` attributes, allowing you to quickly jump from a `<label>` element's `for` attribute to the corresponding input element with a matching `id`.

### Navigate with Ctrl+Click

Simply **Ctrl+Click** (or **Cmd+Click** on Mac) on any value in a `for` attribute to jump directly to the element with that `id`.


**Before:**
```html
<label for="email">Email Address</label>

<!-- Somewhere else in your file... -->
<input id="email" type="email">
```

**With this extension:** Click on `"email"` in the `for` attribute and instantly jump to the `<input id="email">` element!

## Supported Languages

- HTML (`.html`, `.htm`)
- Vue (`.vue`)
- Svelte (`.svelte`)

## Usage

1. Open any HTML file in VSCode
2. Find a `<label>` element with a `for` attribute
3. **Ctrl+Click** (Windows/Linux) or **Cmd+Click** (Mac) on the attribute value
4. You'll jump directly to the element with the matching `id`

### Example

```html
<form>
    <label for="username">Username</label>
    <input id="username" type="text">
    
    <label for="password">Password</label>
    <input id="password" type="password">
</form>
```

Click on `username` or `password` in the `for` attributes to navigate to their corresponding inputs.

## Requirements

- Visual Studio Code version 1.60.0 or higher

## Extension Settings

This extension works out of the box with no configuration required.

Current attributes supported:  `for`, `em-bower`.

To add your additional custo attributes:

Open VS Code settings (Ctrl+,)
Search for "idref"
Click on the Add Item button.

## Known Issues

- Currently only supports navigation within the same file
- Requires exact `id` match (case-sensitive)

## Release Notes

### 0.0.1

Initial release:
- Go to Definition support for HTML `for` and `em-bower` attributes
- Support for HTML, Vue, and Svelte files
- Works with quoted and unquoted attribute values

## Contributing

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/yourusername/html-for-link).

## License

MIT

---

**Enjoy faster HTML navigation!**
