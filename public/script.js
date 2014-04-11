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

    $.spin.imageBasePath = '/';
    $.spin.interval = 0.01;
    $.spin.timeInterval = 200;
    $.spin.changed = function() {
        var s = $(this).attr('name').split('_');
        var x = $('*[name="' + s[0] + '_x"]').val();
        var y = $('*[name="' + s[0] + '_y"]').val();
        var v = "<" + x + "," + y + ",0>";
        send(s[0], side(), v);
    };

    $('*[name="es_x"]').spin({ min: 0.5, max: 1.5 });
    $('*[name="es_y"]').spin({ min: 0.5, max: 1.5 });
    $('*[name="eo_x"]').spin({ min: -0.5, max: 0.5 });
    $('*[name="eo_y"]').spin({ min: -0.5, max: 0.5 });

    $('input[type="text"]').change(function() {
        var s = $(this).attr('name').split('_');
        send(s[0], s[1], side(), $(this).val());
    });

    $('#tint input').minicolors({
        inline: true,
        changeDelay: 200,
        change: function(hex, opacity) {
            send("ti", $('#tint .active a').attr('href').substr(1), side(), hex);
        }
    });
});
