$(document).ready(function(){

   var  all_id = [];

    $("body").bind("DOMSubtreeModified",function(){

        $(".modal:hidden").each(function(){


           idModal = $( this )[0].dataset.modal;

            if( all_id.indexOf(idModal) == -1 && idModal != "{{item.id}}" && idModal != undefined)
            {
                all_id.push(idModal);
            }

        });
    });


setTimeout(function ()
{
    for(var i = 0;i<all_id.length;i++)
    {
        var width = $('.count_checked_'+all_id[i]).html() + '%';

        $('#progressbar'+all_id[i]).css('width', width).attr('aria-valuenow', 20);
    }

},300)

});
