'use strict'

const Hapi = require('hapi')
const Boom = require('boom')
const server = new Hapi.Server()
const stops = require('./bus-stops.json')

let port = +process.env.PORT || 3000
let host = '0.0.0.0'

server.connection({
	host: host,
	port: port,
	routes: {
		cors: true
	}
})

server.route({
	path: '/stops',
	method: 'get',
	config: {
		handler: (request, reply) => reply(stops)
	}
})

server.route({
	path: '/stops/{code}',
	method: 'get',
	config: {
		handler: (request, reply) => {
			let stop = stops.filter(item => item['Stop_Code_LBSL'] === request.params.code).pop()
			reply(stop || Boom.notFound('Stop not found'))
		}
	}
})

server.start(err => console.log('Started server on port ' + port))
