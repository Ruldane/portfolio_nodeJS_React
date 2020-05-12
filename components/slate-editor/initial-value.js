// Create our initial value...
import { Value } from 'slate';

export const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'Une ligne de texte dans un paragraphe',
                            },
                        ],
                    },
                ],
            },
        ],
    },
});
