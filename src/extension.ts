import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const provider = vscode.languages.registerDefinitionProvider(
        ['html', 'htm', 'vue', 'svelte'],
        new HtmlForAttributeDefinitionProvider()
    );
  //context
    context.subscriptions.push(provider);
}

class HtmlForAttributeDefinitionProvider implements vscode.DefinitionProvider {
    provideDefinition(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Definition> {
        const config = vscode.workspace.getConfiguration('idref');
        const customAttributes: string[] = config.get('attributes', []);
        const allAttributes = ['em-bower', 'for', ...customAttributes];
        const line = document.lineAt(position.line).text;
        const wordRange = document.getWordRangeAtPosition(position);
        
        if (!wordRange) return null;

        for(const attr of allAttributes){
            // Check if we're in a 'for' attribute
            //const regex = /for\s*=\s*["']?(\w+)["']?/g;
            //const regex = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, 'gi');
            const regex = new RegExp(`${attr}\\s*=\\s*["']?(\\w+)["']?`, 'gi');
            let match;
            
            while ((match = regex.exec(line)) !== null) {
                const matchStart = match.index + match[0].indexOf(match[1]);
                const matchEnd = matchStart + match[1].length;
                
                if (position.character >= matchStart && position.character <= matchEnd) {
                    const targetId = match[1];
                    return this.findElementById(document, targetId);
                }
            }
        }


        return null;
    }

    private findElementById(
        document: vscode.TextDocument,
        id: string
    ): vscode.Location | null {
        const text = document.getText();
        
        // Look for id attribute with the target value
        const idPattern = new RegExp(`id\\s*=\\s*["']?${id}["']?`, 'g');
        const match = idPattern.exec(text);
        
        if (match) {
            const pos = document.positionAt(match.index);
            const range = new vscode.Range(pos, pos);
            return new vscode.Location(document.uri, range);
        }

        return null;
    }
}

export function deactivate() {}