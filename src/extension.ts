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
        const allAttributes = ['em-bower', 'for', 'be-decked-with', '😶‍🌫️', 'be-inclusive', '🥰', ...customAttributes];
        const line = document.lineAt(position.line).text;
        const wordRange = document.getWordRangeAtPosition(position);
        
        if (!wordRange) return null;

        for(const attr of allAttributes){
            // Match attribute with value that can contain multiple space-separated IDs
            const regex = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, 'gi');
            let match;
            
            while ((match = regex.exec(line)) !== null) {
                const attrValue = match[1];
                const attrValueStart = match.index + match[0].indexOf(attrValue);
                
                // Split the attribute value by spaces to get individual IDs
                const ids = attrValue.split(/\s+/).filter(id => id.length > 0);
                let currentPos = attrValueStart;
                
                // Check each ID to see if the cursor is on it
                for (const id of ids) {
                    console.log({id, ids});
                    const idStart = line.indexOf(id, currentPos);
                    const idEnd = idStart + id.length;
                    
                    if (position.character >= idStart && position.character <= idEnd) {
                        console.log(`Found matching id: ${id}`);
                        return this.findElementById(document, id);
                    }
                    
                    currentPos = idEnd;
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