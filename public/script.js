$(document).ready(function() {
    function send() {
        var text;
        text = $.makeArray(arguments).join(',');
        if(arguments[0] != 'expand'){
            $('#command_text').text("/158 " + text);
        }
        $.ajax({
            type: "POST",
            url: $('#u').val(),
            data: text,
            success: function() {
                console.log('success');
            }
        });
    }

    function side(){
        return $('#side .active').val();
    }

    $.fn.bootstrapSwitch.defaults.size = 'large';
    $("input:checkbox").bootstrapSwitch();

    $('#expand').click(function(){
        var button = $(this);

        if(button.hasClass('expand')){
            send("expand", 0);
            button.removeClass('expand');
            $('#expand i').attr('class', 'fa fa-chevron-circle-right fa-lg');
        }else{
            send("expand", 1);
            button.addClass('expand');
            $('#expand i').attr('class', 'fa fa-chevron-circle-left fa-lg');
        }
    });

    $('#side button').click(function(){
        $('#side button').removeClass('active');
        $(this).addClass('active');
    });

    $('.parts button').click(function(){
        var button = $(this);
        var part = button.closest('.parts');
        var part_name = part.attr('data-part');

        send(part_name, side(), button.val());
        part.find('button').removeClass('active');
        button.addClass('active');
    });

    $('input[name="ear"]').on('switchChange.bootstrapSwitch', function(event, state){
        send('ea', side(), state ? 1 : 0);
    });

    $('#es_x').TouchSpin({ min: 0.5, max: 1.5, step: 0.01, decimals: 2  });
    $('#es_y').TouchSpin({ min: 0.5, max: 1.5, step: 0.01, decimals: 2 });
    $('#eo_x').TouchSpin({ min: -0.5, max: 0.5, step: 0.01, decimals: 2 });
    $('#eo_y').TouchSpin({ min: -0.5, max: 0.5, step: 0.01, decimals: 2 });

    var timer = 0;

    $('#eye input').change(function(){
        var s = $(this).attr('name').split('_');
        var x = $('*[name="' + s[0] + '_x"]').val();
        var y = $('*[name="' + s[0] + '_y"]').val();
        var v = "<" + x + "," + y + ",0>";

        clearTimeout(timer);
        timer = setTimeout(function(){
            send(s[0], side(), v);
        }, 200);
    });

    $('#texture form').submit(function(e) {
        e.preventDefault();
        
        var cmd = new Array();

        for(var i=0; i<e.target.length; i++){
            var input = e.target[i];
            if(input.value){
                cmd.push('te');
                cmd.push(input.name);
                cmd.push(side());
                cmd.push(input.value);
            }
        }

        if(cmd.length > 0){
            send(cmd);
        }
    });

    $('#factory_reset').click(function(){
        send('factory_reset');
    });

    $('#colorpicker').spectrum({
        theme: 'sp-custom',
        color: '#ffffff',
        flat: true,
        showInput: true,
        showInitial: true,
        showButtons: false,
        preferredFormat: "hex",
        move: function(color){
            clearTimeout(timer);
            timer = setTimeout(function(){
                send("ti", $('#tint .active a').attr('href').substr(1), side(), color.toHexString());
            }, 200);
        }
    });

    $('.sp-input').addClass('form-control');
});
