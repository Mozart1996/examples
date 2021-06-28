$(function(){

    /* FILTER
    ==========================*/

    let filter = $('[data-filter]');

    filter.on('click', function(){
        event.preventDefault();

        let category = $(this).data('filter');

        if (category == 'all'){
            $('[data-cat]').removeClass('hide');
        } else {
            $('[data-cat]').each(function(){
                let workCat = $(this).data('cat');

                if(workCat != category){
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
            });
        }
    });

    let btnLoadMore = $('#load_more');

    /* MODAL WINDOWS
    ==========================*/

    const modalCall = $('[data-modal]');

    modalCall.on('click', function(event) {

    });


});
