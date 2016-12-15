$(document).ready(function(){

    $(".search-wrapper input").mouseenter(function(){
        $(".search-wrapper button").css("background-color", "#4aba10");


    });
    $(".search-wrapper input").mouseout(function(){
        $(".search-wrapper button").css("background-color", "" );
    });
    var  all_id = [];

    $("body").bind("DOMSubtreeModified",function(){

        $(".modal:hidden").each(function()
        {
            idModal = $( this )[0].dataset.modal;


            if( all_id.indexOf(idModal) == -1 && idModal != "{{item.id}}" && idModal != undefined)
            {
                all_id.push(idModal);
            }
        });

    });


    setTimeout(function ()
    {
        console.log(all_id);
        for(var i = 0;i<all_id.length;i++)
        {
            var width = $('.count_checked_'+all_id[i]).html();

            $('#progressbar'+all_id[i]).css('width', width+'%').attr('aria-valuenow', 20);

            if(width >= 100)
            {

                $('#progressbar'+all_id[i]).css('background', 'green').attr('aria-valuenow', 20);
            }
            else
            {
                $('#progressbar'+all_id[i]).css('background', '#337ab7').attr('aria-valuenow', 20);
            }
        }

    },500)

});