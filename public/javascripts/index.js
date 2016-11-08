$(function(){
    console.log("hahah");

    $('#post').click(function(){
        $.post('/blogs',{blog:$(this).prev().val()},function(data){
            console.log(data);
            var name=data.BY;
            var time=data.date;
            var content=data.content;
            var div=$('<div />');
            div.addClass('list-group-item');

            div.append($('<a href="#"><h4>'+name+':</h3></a>'));
            div.append('<p>'+content+'</p>');
            div.append('<p>'+time+'</p>')
            $('#blogs').append(div);
            $(this).prev().val="";

        });
    });

 
    function initblogs(){
       // $.post
       for(var i=0,len=Blogs.length;i<len;i++){
        var div=$('<div />');
        var name=Blogs[i].BY;
        var time=Blogs[i].date;
        var content=Blog[i].content;
         div.append('<h3>'+name+'</h3>');
            div.append('<p>'+content+'</p>');
            div.append('<p>'+time+'</p>')
            $('#blogs').append(div);

       }
    }
});