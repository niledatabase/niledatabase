package com.example.todowebapp.xterm;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.socket.TextMessage;

@Controller
public class XtermController {
    @GetMapping("/xterm")
    public String xterm() {
        return "xterm";
    }

    // Due to WebSocket Broker config, this maps to `/app/xterm`
    @MessageMapping("/xterm")
    @SendTo("/resp")
    public TextMessage xtermCmd(TextMessage msg) {
        return new TextMessage("test:" + msg);
    }
}
