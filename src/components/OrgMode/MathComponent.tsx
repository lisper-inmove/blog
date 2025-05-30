import MathJax from "better-react-mathjax/MathJax";
import MathJaxContext from "better-react-mathjax/MathJaxContext";

const config = {
    loader: { load: ["[tex]/ams"] },
    tex: { packages: { "[+]": ["ams"] } },
};

export default function MathComponent({ content }: { content: string }) {
    return (
        <div className="flex m-5">
            <MathJaxContext version={3} config={config}>
                <MathJax
                    className="border border-gray-300 pl-2 pr-2 rounded-2xl bg-amber-100 dark:bg-gray-600"
                    style={{
                        boxShadow:
                            "white -3px -3px 4px 2px, #7e7e7e 3px 3px 4px 2px",
                        borderRadius: "10px",
                    }}
                >
                    {content}
                </MathJax>
            </MathJaxContext>
        </div>
    );
}
