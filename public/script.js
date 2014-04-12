$(document).ready(function() {
    function send() {
        var text;
        text = $.makeArray(arguments).join(',');
        if(arguments[0] != 'expand'){
            $('#command_text').text("/158 " + text);
        }
        $.ajax({
            type: "POST",
            url: "/",
            data: {
                u: $('#u').val(),
                text: text
            },
            success: function() {
                console.log('success');
            }
        });
    }

    function side(){
        return $('#side .active').val();
    }

    $('#expand').click(function(){
        var button = $(this);

        if(button.hasClass('active')){
            send("expand", 0);
            button.removeClass('active');
        }else{
            send("expand", 1);
            button.addClass('active');
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

        if(part_name == "ea"){
            if(button.hasClass('active')){
                send(part_name, side(), 0);
                button.removeClass('active');
            }else{
                send(part_name, side(), 1);
                button.addClass('active');
            }
        }else{
            send(part_name, side(), button.val());
            part.find('button').removeClass('active');
            button.addClass('active');
        }
    });

    $('#eye input').change(function(){
        var s = $(this).attr('name').split('_');
        var x = $('*[name="' + s[0] + '_x"]').val();
        var y = $('*[name="' + s[0] + '_y"]').val();
        var v = "<" + x + "," + y + ",0>";
        send(s[0], side(), v);
    });

    $('#es_x').TouchSpin({ min: 0.5, max: 1.5, step: 0.01, decimals: 2, prefix: 'X' });
    $('#es_y').TouchSpin({ min: 0.5, max: 1.5, step: 0.01, decimals: 2, prefix: 'Y' });
    $('#eo_x').TouchSpin({ min: -0.5, max: 0.5, step: 0.01, decimals: 2, prefix: 'X' });
    $('#eo_y').TouchSpin({ min: -0.5, max: 0.5, step: 0.01, decimals: 2, prefix: 'Y' });

    var timer = 0;

    $('#texture input[type="text"]').change(function() {
        clearTimeout(timer);
        timer = setTimeout(function(){
            var s = $(this).attr('name').split('_');
            send(s[0], s[1], side(), $(this).val());
        }, 500);
    });

    $('#colorpicker').colpick({
        flat: true,
        layout: 'full',
        onSubmit: function(hsb, hex, rgb, el, bySetColor) {
            send("ti", $('#tint .active a').attr('href').substr(1), side(), '#' + hex);
        }
    });

    // I sepcified hue bar in a image. Because the linear-gradient did not apper in the prim media.
    $('.colpick_hue').attr('style', 'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACaCAIAAADn1rVeAAAAf0lEQVQoz6WL0QrDQAgEhyUEzvv/T72zhYB9SAJWkpbSh2F1HQkQmKAJekpLvX3hdOp/ExjBk43QADloXuDwdr9z73oHFgLWEMbvtDT3tPdyMyBCMAsuGGmef+AQK0sgAzX2rDRQT5n76vbUJ58tIB6IifAjJ2JcdBU/vE/Ozgsys1gUkbIISwAAAABJRU5ErkJggg==);');
});
