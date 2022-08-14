'use strict';
const db = uniCloud.database(); //代码块为cd
function getFormatDate({
	date,
	type
}) {
	let dd;
	if (!date) {
		dd = new Date();
	} else {
		dd = new Date(date)
	}
	const y = dd.getFullYear();
	const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
	const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
	const hour = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours()
	const minute = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes()
	const second = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds()
	if (type === 'all') {
		return y + "-" + m + "-" + d + ' ' + hour + ':' + minute + ':' + second
	} else if (type === 'date') {
		return y + "-" + m + "-" + d
	} else if (type === 'time') {
		return hour + ':' + minute + ':' + second
	} else {
		return ''
	}
}
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const {
		httpMethod,
		path,
		queryStringParameters
	} = event
	const res = {}
	if (httpMethod === 'GET') {
		if (path === '/') {
			const {
				username = ''
			} = queryStringParameters
			const collection = username ? await db.collection("record").where({
				'username': username
			}).get() : await db.collection("record").get()
			// 返回数据给客户端
			return {
				...collection,
				event,
				context,
				username,
				collection
			}
		} else if (path === '/getAllTimeRecord') {
			const {
				username = ''
			} = queryStringParameters
			const collection = username ? await db.collection("timeRecord").where({
				'username': username
			}).get() : await db.collection("timeRecord").get()
			// 返回数据给客户端
			return {
				...collection,
				event,
				context,
				username,
				collection
			}
		} else if (path === '/getCurrentTimeRecord') {
			const {
				username = '', currentDate
			} = queryStringParameters
			const collection = await db.collection("timeRecord").where({
				username,
				'date': currentDate
			}).get()
			let total = 0
			const dataList = collection.data.map(item => {
				let desc = item.startTimeDesc
				if (item.overTime) {
					desc = desc + ' -> ' + item.overTimeDesc
					total += item.overTime - item.startTime
				}
				item.desc = desc
				return item
			})
			// 返回数据给客户端
			return {
				dataList,
				event,
				context,
				currentDate,
				collection,
				total
			}
		} else if (path === '/getDayRecord') {
			const {
				username = ''
			} = queryStringParameters
			const collection = await db.collection("timeRecord").where({
				username,
			}).get()
			let dayRecord = {}
			const dataList = collection.data.map(item => {
				if (item.overTime) {
					const date = item.date
					dayRecord[date] ? dayRecord[date] += item.overTime - item.startTime : dayRecord[date] = item.overTime - item.startTime
				}
				return item
			})
			for (let key in dayRecord) {
				const value = dayRecord[key]
				dayRecord[key] = (value / 3600000).toFixed(1)

			}
			const dayRecordLine = Object.keys(dayRecord)
			const dayRecordValue = Object.values(dayRecord)
			// 返回数据给客户端
			return {
				dataList,
				event,
				context,
				collection,
				dayRecordLine,
				dayRecordValue,
				dayRecord
			}
		} else if (path === '/getAllPicture') {
			const collection = await db.collection("storageTable").get()
			// 返回数据给客户端
			return {
				...collection,
				event,
				context,
			}
		} else if (path === '/getAllVideos') {
			const collection = await db.collection("videoTable").get()
			// 返回数据给客户端
			return {
				...collection,
				event,
				context,
			}
		} else if (path === '/getTermVideos') {
			const {
				limit = 1, skip = 1
			} = queryStringParameters
			const collection = await db.collection("videoTable").skip(Number(skip)).limit(Number(limit)).get()
			// 返回数据给客户端
			return {
				...collection,
				event,
				context,
			}
		}
	}
	if (httpMethod === 'POST') {
		if (path === '/add') {
			let body = event.body
			// if (event.isBase64Encoded) {
			// 	body = Buffer.from(body)
			// }
			const param = JSON.parse(body) // param为客户端上传的数据
			const {
				username = ''
			} = param
			const collectionList = username ? await db.collection("record").where({
				'username': param.username
			}).get() : await db.collection("record").get()

			if (collectionList.data.findIndex(item => item.date === param.date) === -1) {
				await db.collection('record').add(param)
				return {
					msg: '添加成功',
					recordLength: collectionList.data.length + 1,
					event,
					context
				}
			} else {
				return {
					msg: '已存在此数据项',
					recordLength: collectionList.data.length,
					event,
					context
				}
			}
		} else if (path === '/addFile') {
			let body = event.body
			// if (event.isBase64Encoded) {
			// 	body = Buffer.from(body)
			// }
			const param = JSON.parse(body) // param为客户端上传的数据
			await db.collection('storageTable').add(param)
			return {
				msg: '添加成功',
				event,
				context
			}
		} else if (path === '/delFile') {
			let body = event.body
			// if (event.isBase64Encoded) {
			// 	body = Buffer.from(body)
			// }
			const param = JSON.parse(body) // param为客户端上传的数据
			let res = await db.collection("storageTable").where({
				fileID: param.fileID
			}).remove()
			const result = await uniCloud.deleteFile({
				fileList: [param.fileID]
			});
			return {
				result
			}
		} else if (path === '/addVideo') {
			let body = event.body
			// if (event.isBase64Encoded) {
			// 	body = Buffer.from(body)
			// }
			const param = JSON.parse(body) // param为客户端上传的数据
			await db.collection('videoTable').add(param)
			return {
				msg: '添加成功',
				event,
				context
			}
		} else if (path === '/addTimeRecord') {
			let body = event.body
			// if (event.isBase64Encoded) {
			// 	body = Buffer.from(body)
			// }
			const param = JSON.parse(body) // param为客户端上传的数据
			await db.collection('timeRecord').add(param)
			return {
				msg: '添加成功',
				event,
				context
			}
		} else if (path === '/editTimeRecord') {
			let body = event.body
			// if (event.isBase64Encoded) {
			// 	body = Buffer.from(body)
			// }
			const param = JSON.parse(body) // param为客户端上传的数据
			await db.collection('timeRecord').where({
				_id: param._id,
			}).update({
				startTime: param.startTime,
				startTimeDesc: param.startTimeDesc,
				overTime: param.overTime,
				overTimeDesc: param.overTimeDesc
			})
			const list = await db.collection('timeRecord').where({
				_id: param._id
			}).get()
			return {
				msg: '添加成功',
				username: param.username,
				event,
				context,
				list
			}
		}
		else if (path === '/delTimeRecord') {
			let body = event.body
			const { _id } = JSON.parse(body) // param为客户端上传的数据
			await db.collection('timeRecord').where({ _id }).remove()
			return {
				msg: '删除成功',
				event,
				context
			}
		}
	}
}
	// const str = "放回数据"
	// const res = await db.collection('users').get()
	// const data = {
	// 	res,
	// 	event,
	// 	str
	// }
	//返回数据给客户端
	// return {
	// 	event,
	// 	context
	// }
