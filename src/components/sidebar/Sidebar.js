import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { Chat } from '@material-ui/icons';

import './sidebar.css';
import SidebarChat from '../sidebarChat/SidebarChat';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';

const Sidebar = () => {
	const [rooms, setRooms] = useState([]);
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		// const unscubscribe =
		db.collection('rooms')
			.where('userEmail', 'array-contains', user.email)
			.onSnapshot((snapshot) => {
				setRooms(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});

		// return () => {
		// 	unsubscribe();
		// };
	}, [user.email]);

	const createChat = () => {
		const roomName = prompt('Please enter a name for Chat Room');

		if (roomName) {
			db.collection('rooms').add({
				name: roomName,
				userEmail: [user.email],
			});
		}
	};

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src={user ? user.photoURL : ''} />
				<div className="sidebar__headerRight">
					<IconButton onClick={createChat}>
						<Chat />
					</IconButton>
				</div>
			</div>
			{/* <div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlined />
					<input placeholder="Search or start new chat" />
				</div>
			</div> */}
			<div className="sidebar__chats">
				{rooms.map((room) => (
					<SidebarChat
						key={room.id}
						id={room.id}
						name={room.data.name}
					/>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
