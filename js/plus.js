$(document).ready(function() {
    var hide_show_switch_css = {
        "border": "none",
        "text-align": "left",
        "color": "rgb(131, 140, 8)",
        "background-color": "#0a2831",
        "margin-left": "20px",
        "outline": "none"
    }
    var code_block_css = {
        "margin-top": 0,
        "display": "none"
    }
    function hide_show_switch_click(src_block, button, fold, unfold) {
        var txt = button.text();
        button.css(hide_show_switch_css);
        if (txt == fold) {
            // 折叠
            // console.log(txt);
            // button.html(unfold);
        } else {
            // 展开
            button.html(fold);
            src_block.click(function() {
                console.log("click src block");
                button.css({"display": "block"});
                src_block.toggle("slow");
                src_block.unbind("click");
                button.html(unfold);
            });
            button.css({"display": "none"});
        }
        src_block.toggle("slow");
    }
    $(".src-json").each(function() {
        var fold = "折叠Json";
        var unfold = "展开Json";
        var hide_show_switch = $("<button>" + unfold + "</button>");
        var code_block = $(this);
        var code_block_width = $(this).width();
        code_block.css(code_block_css)

        hide_show_switch.insertBefore($(this));
        hide_show_switch.css(hide_show_switch_css)
        hide_show_switch.click(function() {
            hide_show_switch_click(code_block, $(this), fold, unfold)
        });
    });

    $(".src-emacs-lisp").each(function() {
        var fold = "折叠EmacsLisp";
        var unfold = "展开EmacsLisp";
        var hide_show_switch = $("<button>" + unfold + "</button>");
        var code_block = $(this);
        var code_block_width = $(this).width();
        code_block.css(code_block_css)

        hide_show_switch.insertBefore($(this));
        hide_show_switch.css(hide_show_switch_css)
        hide_show_switch.click(function() {
            hide_show_switch_click(code_block, $(this), fold, unfold)
        });
    });

    $(".src-python").each(function() {
        var fold = "折叠Python";
        var unfold = "展开Python";
        var hide_show_switch = $("<button>" + unfold + "</button>");
        var code_block = $(this);
        var code_block_width = $(this).width();
        code_block.css(code_block_css)

        hide_show_switch.insertBefore($(this));
        hide_show_switch.css(hide_show_switch_css)
        hide_show_switch.click(function() {
            hide_show_switch_click(code_block, $(this), fold, unfold)
        });
    });
    $(".src-org").each(function() {
        var fold = "折叠OrgMode";
        var unfold = "展开OrgMode";
        var hide_show_switch = $("<button>" + unfold + "</button>");
        var code_block = $(this);
        var code_block_width = $(this).width();
        code_block.css(code_block_css)

        hide_show_switch.insertBefore($(this));
        hide_show_switch.css(hide_show_switch_css)
        hide_show_switch.click(function() {
            hide_show_switch_click(code_block, $(this), fold, unfold)
        });
    });
    $(".src-c").each(function() {
        var fold = "折叠C";
        var unfold = "展开C";
        var hide_show_switch = $("<button>" + unfold + "</button>");
        var code_block = $(this);
        var code_block_width = $(this).width();
        code_block.css(code_block_css)

        hide_show_switch.insertBefore($(this));
        hide_show_switch.css(hide_show_switch_css)
        hide_show_switch.click(function() {
            hide_show_switch_click(code_block, $(this), fold, unfold)
        });
    });
    $(".src-common-lisp").each(function() {
        var fold = "折叠CommonLisp";
        var unfold = "展开CommonLisp";
        var hide_show_switch = $("<button>" + unfold + "</button>");
        var code_block = $(this);
        var code_block_width = $(this).width();
        code_block.css(code_block_css)

        hide_show_switch.insertBefore($(this));
        hide_show_switch.css(hide_show_switch_css)
        hide_show_switch.click(function() {
            hide_show_switch_click(code_block, $(this), fold, unfold)
        });
    });
})
