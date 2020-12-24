import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarOption from "./SidebarOption";
import db from "./firebase";

function Sidebar() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Clever Programmer</h2>
          <h3>
            <FiberManualRecordIcon />
            Brandon Hancock
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption
        key="InsertCommentIcon"
        Icon={InsertCommentIcon}
        title="Threads"
      />
      <SidebarOption
        key="InboxIcon"
        Icon={InboxIcon}
        title="Mentions & reactions"
      />
      <SidebarOption key="DraftsIcon" Icon={DraftsIcon} title="Saved items" />
      <SidebarOption
        key="BookmarkBorderIcon"
        Icon={BookmarkBorderIcon}
        title="Channel browser"
      />
      <SidebarOption
        key="PeopleAltIcon"
        Icon={PeopleAltIcon}
        title="People & user groups"
      />
      <SidebarOption key="AppsIcon" Icon={AppsIcon} title="Apps" />
      <SidebarOption
        key="FileCopyIcon"
        Icon={FileCopyIcon}
        title="File browser"
      />
      <SidebarOption
        key="ExpandLessIcon"
        Icon={ExpandLessIcon}
        title="Show less"
      />
      <hr />
      <SidebarOption
        key="ExpandMoreIcon"
        Icon={ExpandMoreIcon}
        title="Show more"
      />
      <hr />
      <SidebarOption
        addChannelOption
        key="AddIcon"
        Icon={AddIcon}
        title="Add channel"
      />

      {channels.map((channel) => (
        <SidebarOption
          id={channel.id}
          key={channel.name}
          title={channel.name}
        />
      ))}
    </div>
  );
}

export default Sidebar;
