export function convertTokenToClass(text: string): token[] {
    var strings = splitParameter(text);
    var tokens: token[] = [];
    
    for (let i = 0; i < strings.length; i++) {
        if(strings[i] == '**') {
            tokens.push(new token(strings[i+1], styles.bold));
            
            i += 2;
            continue;
        }
        
        if(strings[i] == '__') {
            tokens.push(new token(strings[i+1], styles.italic));
            
            i += 2;
            continue;
        }
        
        tokens.push(new token(strings[i], styles.normal));
    }
    
    return tokens;
}

export class token {
    public text: string = "";
    public style: styles = styles.normal;
    
    public constructor(_text: string, _style: styles) {
        this.text = _text;
        this.style = _style;
    }
}

function splitParameter(text: string): string[] {
    return text.split(/(\*\*|\_\_)/);
}

enum styles {
    normal = '\x1b[0;0m',
    bold = '\x1b[1;97m',
    faint = '\x1b[2;0m',
    italic = '\x1b[3;0m',
    underline = '\x1b[4;0m',
}