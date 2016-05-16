'use strict';

// var _ = require('lodash');
var P = require('../../util/promise');
var mocha = require('mocha');
// var assert = require('assert');
var size_utils = require('../../util/size_utils');
var coretest = require('./coretest');
var os_utils = require('../../util/os_utils');

mocha.describe('node_server', function() {

    var client = coretest.new_test_client();

    const SYS = 'test-node-system';
    const EMAIL = SYS + '@coretest.coretest';
    const PASSWORD = 'tululu';
    const ACCESS_KEYS = {
        access_key: 'ydaydayda',
        secret_key: 'blablabla'
    };
    const NODE = 'test-node';

    mocha.it('works', function() {
        this.timeout(20000);
        let nodes;
        return P.resolve()
            .then(() => client.account.create_account({
                name: SYS,
                email: EMAIL,
                password: PASSWORD,
                access_keys: ACCESS_KEYS
            }))
            .then(res => {
                client.options.auth_token = res.token;
            })
            .then(() => client.node.create_node({
                name: NODE
            }))
            .then(res => {
                client.options.auth_token = res.token;
            })
            .then(() => client.node.heartbeat({
                name: NODE,
                version: require('../../../package.json').version,
                port: 0,
                storage: {
                    alloc: 10 * size_utils.GIGABYTE,
                    used: size_utils.GIGABYTE,
                },
                os_info: os_utils.os_info(),
            }))
            .then(() => client.create_auth_token({
                system: SYS,
                email: EMAIL,
                password: PASSWORD,
            }))
            .then(() => client.node.read_node({
                name: NODE
            }))
            .then(() => client.node.update_node({
                name: NODE,
                geolocation: 'here i am'
            }))
            .then(() => client.object.read_node_mappings({
                name: NODE,
            }))
            .then(() => client.node.list_nodes({}))
            .then(res => client.node.get_test_nodes({
                count: 10,
                source: res.nodes && res.nodes[0].rpc_address,
            }))
            .then(() => client.node.ping())
            .then(() => coretest.init_test_nodes(client, SYS, 3))
            .then(() => client.node.list_nodes({}))
            .then(res => {
                nodes = res.nodes;
            })
            .then(() => console.log('NODES', nodes))
            .then(() => client.node.set_debug_node({
                target: nodes[0].rpc_address,
                level: 0,
            }))
            .then(() => client.node.collect_agent_diagnostics(nodes[0])) //{
            //name: nodes[0].name,
            //target: nodes[0].rpc_address,
            //}))
            .then(() => client.node.redirect({
                target: nodes[0].rpc_address,
                request_params: {
                    level: 0,
                },
                method_api: 'agent_api',
                method_name: 'set_debug_node',
            }))
            // .then(() => client.node.n2n_signal({
            //     target: nodes[0].rpc_address,
            //     secret_signal_info: 'shhh'
            // }))
            .then(() => client.node.test_node_network({
                source: nodes[0].rpc_address,
                target: nodes[1].rpc_address,
                request_length: 1024,
                response_length: 2048,
                count: 10,
                concur: 3,
            }))
            // .then(() => client.node.delete_node({
            // name: NODE
            // }))
            .then(() => coretest.clear_test_nodes());
    });

});
