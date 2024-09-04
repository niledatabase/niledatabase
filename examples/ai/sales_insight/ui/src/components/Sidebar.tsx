import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Description from "@mui/icons-material/Description";

interface SidebarProps {
  items: string[];
  onClick: (file: string) => void;
  selectedItems: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  onClick,
  selectedItems,
}) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
            <ListItemButton
              onClick={() => onClick(items[index])}
              selected={selectedItems?.includes(items[index])}
            >
              <ListItemDecorator>
                <Description />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="body-md" noWrap>
                  {item}
                </Typography>
              </ListItemContent>
            </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
