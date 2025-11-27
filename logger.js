/**
 * シンプルなログ出力機能
 * Simple logging functionality for claude-test
 */

class Logger {
    constructor(options = {}) {
        this.level = options.level || 'INFO';
        this.enableTimestamp = options.enableTimestamp !== false;
        this.enableColors = options.enableColors !== false;
        
        // ログレベルの優先度
        this.levels = {
            'ERROR': 0,
            'WARN': 1,
            'INFO': 2,
            'DEBUG': 3
        };
        
        // カラーコード（Node.js環境用）
        this.colors = {
            'ERROR': '\x1b[31m', // 赤
            'WARN': '\x1b[33m',  // 黄
            'INFO': '\x1b[36m',  // シアン
            'DEBUG': '\x1b[37m', // 白
            'RESET': '\x1b[0m'
        };
    }
    
    /**
     * タイムスタンプを取得
     * @returns {string} フォーマットされたタイムスタンプ
     */
    getTimestamp() {
        if (!this.enableTimestamp) return '';
        
        const now = new Date();
        return `[${now.toISOString()}]`;
    }
    
    /**
     * ログレベルが出力対象かチェック
     * @param {string} level - チェックするレベル
     * @returns {boolean} 出力対象かどうか
     */
    shouldLog(level) {
        return this.levels[level] <= this.levels[this.level];
    }
    
    /**
     * ログメッセージをフォーマット
     * @param {string} level - ログレベル
     * @param {string} message - メッセージ
     * @returns {string} フォーマットされたメッセージ
     */
    formatMessage(level, message) {
        const timestamp = this.getTimestamp();
        const color = this.enableColors ? this.colors[level] : '';
        const reset = this.enableColors ? this.colors.RESET : '';
        
        return `${timestamp} ${color}[${level}]${reset} ${message}`;
    }
    
    /**
     * ログを出力
     * @param {string} level - ログレベル
     * @param {string} message - メッセージ
     * @param {...any} args - 追加の引数
     */
    log(level, message, ...args) {
        if (!this.shouldLog(level)) return;
        
        const formattedMessage = this.formatMessage(level, message);
        
        if (level === 'ERROR') {
            console.error(formattedMessage, ...args);
        } else if (level === 'WARN') {
            console.warn(formattedMessage, ...args);
        } else {
            console.log(formattedMessage, ...args);
        }
    }
    
    /**
     * ERRORレベルでログ出力
     * @param {string} message - メッセージ
     * @param {...any} args - 追加の引数
     */
    error(message, ...args) {
        this.log('ERROR', message, ...args);
    }
    
    /**
     * WARNレベルでログ出力
     * @param {string} message - メッセージ
     * @param {...any} args - 追加の引数
     */
    warn(message, ...args) {
        this.log('WARN', message, ...args);
    }
    
    /**
     * INFOレベルでログ出力
     * @param {string} message - メッセージ
     * @param {...any} args - 追加の引数
     */
    info(message, ...args) {
        this.log('INFO', message, ...args);
    }
    
    /**
     * DEBUGレベルでログ出力
     * @param {string} message - メッセージ
     * @param {...any} args - 追加の引数
     */
    debug(message, ...args) {
        this.log('DEBUG', message, ...args);
    }
    
    /**
     * ログレベルを設定
     * @param {string} level - 新しいログレベル
     */
    setLevel(level) {
        if (this.levels.hasOwnProperty(level)) {
            this.level = level;
        } else {
            throw new Error(`Invalid log level: ${level}`);
        }
    }
}

// デフォルトのロガーインスタンス
const defaultLogger = new Logger();

module.exports = {
    Logger,
    logger: defaultLogger
};