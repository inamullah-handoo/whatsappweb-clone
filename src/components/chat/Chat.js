import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

import './chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { useParams } from 'react-router-dom';

import db from '../../firebase';
import { useStateValue } from '../../StateProvider';

const Chat = () => {
	const [seed, setSeed] = useState('');
	const [input, setInput] = useState('');
	const { roomID } = useParams();
	const [roomName, setRoomName] = useState('');
	const [messages, setMessages] = useState([]);
	const [{ user }, dispatch] = useStateValue();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		db.collection('rooms').doc(roomID).collection('messages').add({
			message: input,
			user: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput('');
	};

	useEffect(() => {
		if (roomID) {
			db.collection('rooms')
				.doc(roomID)
				.onSnapshot((snapshot) => {
					setRoomName(snapshot.data().name);
				});
			db.collection('rooms')
				.doc(roomID)
				.collection('messages')
				.orderBy('timestamp', 'asc')
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
			db.collection('rooms')
				.doc(roomID)
				.onSnapshot((snapshot) => {
					setUsers(snapshot.data().userEmail);
				});
		}
	}, [roomID]);

	const addUser = () => {
		const userEmail = prompt('Please enter a email of the person');

		if (userEmail) {
			db.collection('rooms')
				.doc(roomID)
				.update({
					userEmail: firebase.firestore.FieldValue.arrayUnion(
						userEmail
					),
				});
		}
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>
						{users.map((user, i, users) =>
							users.length === i + 1 ? (
								<span key={i}>{user}</span>
							) : (
								<span key={i}>{user}, </span>
							)
						)}
					</p>
				</div>
				<div className="chat__headerRight">
					<IconButton onClick={addUser}>
						<PersonAdd />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{messages.map((msg) => (
					<p
						key={msg.timestamp}
						className={`chat__message ${
							msg.user === user.displayName && 'chat__receiver'
						}`}
					>
						<p className="chat__name">{msg.user}</p>
						{msg.message}
						<span className="chat__timestamp">
							{new Date(msg.timestamp?.toDate()).toUTCString()}
						</span>
					</p>
				))}
			</div>
			<div className="chat__footer">
				<form>
					<input
						type="text"
						placeholder="Type a Message"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button type="submit" onClick={sendMessage}>
						Send a Message
					</button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
