import MathJax from "better-react-mathjax/MathJax";
import MathJaxContext from "better-react-mathjax/MathJaxContext";

const config = {
    loader: { load: ["[tex]/ams"] },
    tex: { packages: { "[+]": ["ams"] } },
};

export default function MathComponent({ content }: { content: string }) {
    return (
        <MathJaxContext version={3} config={config}>
            <MathJax>{content}</MathJax>
        </MathJaxContext>
    );
}
