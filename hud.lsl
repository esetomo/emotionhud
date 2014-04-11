default
{
    state_entry()
    {
        llSetRot(ZERO_ROTATION);
        llRequestURL();
        llRequestPermissions(llGetOwner(), PERMISSION_TAKE_CONTROLS);
    }
    
    http_request(key id, string method, string body)
    {
        list l;
        
        if(method == URL_REQUEST_GRANTED){
            string url = "http://ancient-inlet-1027.herokuapp.com/?u=" + llEscapeURL(body);
            l = [PRIM_MEDIA_HOME_URL, url,
                            PRIM_MEDIA_CURRENT_URL, url,
                            PRIM_MEDIA_AUTO_PLAY, TRUE,
                            PRIM_MEDIA_FIRST_CLICK_INTERACT, TRUE,
                            PRIM_MEDIA_AUTO_SCALE, TRUE,
                            PRIM_MEDIA_WIDTH_PIXELS, 512,
                            PRIM_MEDIA_HEIGHT_PIXELS, 512,
                            PRIM_MEDIA_PERMS_INTERACT, PRIM_MEDIA_PERM_ANYONE,
                            PRIM_MEDIA_PERMS_CONTROL, PRIM_MEDIA_PERM_NONE];
            
            llSetLinkMedia(0, 0, l);
        }else if(method == "POST"){
            l = llCSV2List(body);
            string cmd = llList2String(l, 0);
            if(cmd == "expand"){
                if(llList2Integer(l, 1)){
                    llSetRot(<0.00000, 0.00000, -0.70711, 0.70711>);
                }else{
                    llSetRot(ZERO_ROTATION);
                }
            }else{
                llRegionSayTo(llGetOwner(), 158, body);
            }
            llHTTPResponse(id, 200, "OK");
        }
    }

    run_time_permissions(integer perms){
        if(PERMISSION_TAKE_CONTROLS & perms){
            llTakeControls(CONTROL_BACK, TRUE, TRUE);
        }
    }

    on_rez(integer start_param)
    {
        llResetScript();        
    }
    
    changed(integer change)
    {
        if(change & (CHANGED_OWNER | CHANGED_REGION | CHANGED_TELEPORT | CHANGED_REGION_START | CHANGED_LINK)){
            llResetScript();
        }
    }
}
