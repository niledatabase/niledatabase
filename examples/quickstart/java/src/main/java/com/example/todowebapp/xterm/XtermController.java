package com.example.todowebapp.xterm;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.jline.reader.impl.DefaultParser;
import static org.toilelibre.libe.curl.Curl.curl;
import static org.toilelibre.libe.curl.Curl.$;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.stream.Collectors;


@Controller
public class XtermController {

    private DefaultParser lineParser = new DefaultParser();

    @GetMapping("/xterm")
    public String xterm() {
        return "xterm";
    }

    // Due to WebSocket Broker config, this maps to `/app/xterm`
    @MessageMapping("/xterm")
    @SendTo("/resp")
    public XTermResponse xtermCmd(XTermCommand cmd) {
        String strCmd = cmd.getCommand();

        System.out.println("got websocket message!" + strCmd);

        List<String> parsed = lineParser.parse(strCmd, 0).words();
        if (!"curl".equals(parsed.get(0).toLowerCase())) {
            return new XTermResponse("Error: This terminal emulator only supports CURL");
        } else {
            String resp = $(strCmd);
            return new XTermResponse(resp);
        }
    }
}
