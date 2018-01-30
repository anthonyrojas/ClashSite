$(document).ready(function(){
    $("form").submit(function(e){
        var tagValue = document.getElementById("tagSearch");
        if(tagValue.value === null || tagValue.value.trim()===""){
            document.getElementById("error-space").innerHTML = '<div class="col-md-2"></div><div class="col-md-8 alert alert-danger"><strong>Error!</strong> You forgot to enter a tag.</div><div class="col-md-2"></div>';
            document.getElementById("tagSearch").value = null;
            e.preventDefault();
        }
        else{
            if(document.getElementById("clanRadio").checked){
                var url = window.location.href;
                var a = url.indexOf("?");
                var b =  url.substring(a);
                var c = url.replace(b,"");
                url = c;
                document.getElementById("searchForm").setAttribute('action', '/clan/' + tagValue.value);
                document.getElementById("searchForm").submit();
            }
            else if(document.getElementById("playerRadio").checked){
                var url = window.location.href;
                var a = url.indexOf("?");
                var b =  url.substring(a);
                var c = url.replace(b,"");
                url = c;
                document.getElementById("searchForm").setAttribute('action', '/player/' + tagValue.value);
                document.getElementById("searchForm").submit();
            }
        }
    })
});