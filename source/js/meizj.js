
$(document).ready(function () {
    showArticleIndex();
});

function showArticleIndex() {
    var h1List = h2List = h3List = [];
    var labelList = $("article").children();

    console.log(labelList.length);

    for(var i=0;i<labelList.length;i++){
        if(i!=0){
            if($(labelList[i]).is("h1")){
                h2List = new Array();
                h1List.push({
                    node:$(labelList[i]),
                    id:i,
                    children:h2List
                })
            }
        }
        

        if($(labelList[i]).is("h2")){
            h3List = new Array();
            h2List.push({
                node:$(labelList[i]),
                id:i,
                children:h3List
            })
        }

        if($(labelList[i]).is("h3")){

            h1List.push({
                node:$(labelList[i]),
                id:i,
                children:[]
            })
        }
    }

    function show(tocList){
        var content = "<url>";
        tocList.forEach(function(toc){
            toc.node.before('<span class="anchor" id="_label'+toc.id+'"></span>');
            if(toc.children == 0){
                content += '<li><a class="bar" href="#_label'+toc.id+'">'+toc.node.text()+'</a></li>';
            }else {
                content += '<li><a class="bar" href="#_label'+toc.id+'">'+toc.node.text()+'</a>'+show(toc.children)+'</li>';
            }
        })

        content += "</ul>";
        return content;
    }

    $("body #toc").empty();
    $("body #toc").append(show(h1List));

    $("#toc a").on("click", function(e){
        e.preventDefault();
        // 获取当前点击的 a 标签，并前触发滚动动画往对应的位置
        var target = $(this.hash);
        $("body, html").animate(
            {'scrollTop': target.offset().top},
            500
        );
    });

}
