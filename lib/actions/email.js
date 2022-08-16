const rabbitmq = require('msgbroker-nxg-cg');
const {log, constants} = require('utils-nxg-cg');
const {email} = require('email-cg-lib');
const {emits} = constants;


/**
 * Method for sftp connections
 * @param msg
 * @param cfg
 * @param snapshot
 * @returns {Promise<void>}
 */
 module.exports.process = async function sftpProcess(msg, cfg, snapshot = {}) {
    try {
        const _data = await email(msg, cfg);
        this.emit(emits.data, {data: _data});
        snapshot.lastUpdated = new Date();
        this.emit(emits.snapshot, snapshot);
        log.info(constants.FINISH_EXEC);
        this.emit(emits.end);
    } catch (e) {
        log.error(e);
        this.emit(emits.error, e);
        await rabbitmq.producerErrorMessage(msg.toString(), e.toString());
    }
};