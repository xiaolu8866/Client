const React = require('react');
const { connect } = require('react-redux');
const moment = require('moment');
const MsgItem = require('../../components/MsgItem');
const scrollTo = require('../../utils/animatedScrollTo.js');
const ReactTooltip = require('react-tooltip');
const { sendMsg } = require('../../redux/actions/chat');

require('./ConverseDetail.scss');

class ConverseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: '',
      inputType: 'normal'
    };
  }

  componentDidMount() {
    let container = this.refs.container;
    scrollTo.bottom(container, 400);
  }

  componentDidUpdate() {
    let container = this.refs.container;
    scrollTo.bottom(container, 400);
  }

  _handleSendMsg() {
    let message = this.state.inputMsg;
    let type = this.state.inputType;
    console.log('send msg:', message, this.props.converseUUID);
    this.props.dispatch(sendMsg(this.props.converseUUID ,{
      message,
      is_public: false,
      type,
    }));
    this.refs.inputMsg.focus();
    this.setState({inputMsg: ''});
  }

  getMsgList(list) {
    if(!!list) {
      let userUUID = this.props.userUUID;
      let usercache = this.props.usercache;
      return (
        <div className="msg-items">
        {
          list.map((item, index) => {
            return (
              <MsgItem
                key={item.uuid+'+'+index}
                icon={item.icon || '/src/assets/img/gugugu1.png'}
                name={usercache.getIn([item.sender_uuid, 'username']) || ''}
                content={item.message}
                time={moment(item.date).format('HH:mm:ss')}
                me={userUUID===item.sender_uuid}
              />
            )
          })
        }
        </div>
      )
    }else {
      return (
        <div className="msg-items">
          <MsgItem
            icon="/src/assets/img/gugugu1.png"
            name="admin"
            content="咕咕咕？"
            time="2017-08-17 13:48:46"
          />
          <MsgItem
            icon="/src/assets/img/gugugu1.png"
            name="admin"
            content="咕咕咕？"
            time="2017-08-17 13:48:46"
            me={true}
          />
          <MsgItem
            icon="/src/assets/img/gugugu1.png"
            name="admin"
            content="咕咕！咕咕咕咕咕咕咕咕咕咕咕咕咕咕!!咕咕咕咕!咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕咕"
            time="2017-08-17 13:48:46"
            me={false}
          />
          <MsgItem
            icon="/src/assets/img/gugugu1.png"
            name="admin"
            content="咕咕~咕咕咕？"
            time="2017-08-17 13:48:46"
            me={false}
          />
          <MsgItem
            icon="/src/assets/img/gugugu1.png"
            name="admin"
            content="咕咕咕！"
            time="2017-08-17 13:48:46"
            me={true}
          />
          <MsgItem
            icon="/src/assets/img/gugugu1.png"
            name="admin"
            content="咕！！！！"
            time="2017-08-17 13:48:46"
            me={true}
          />
        </div>
      )
    }
  }

  render() {
    let list = this.props.list;
    if(!!list) {
      list = list.toJS();
    }
    let inputType = this.state.inputType;
    return (
      <div className="conv-detail">
        <div className="conv-container" ref="container">
          {this.getMsgList(list)}
        </div>
        <div className="send-msg-box">
          <div className="input-area">
            <div className="tool-area">
              <ReactTooltip effect='solid' />
              <div
                data-tip="普通信息"
                className={inputType==='normal'?"tool-item active":"tool-item"}
                onClick={() => this.setState({inputType: 'normal'})}
              >
                <i className="iconfont">&#xe72d;</i>
              </div>
              <div
                data-tip="吐槽信息"
                className={inputType==='occ'?"tool-item active":"tool-item"}
                onClick={() => this.setState({inputType: 'occ'})}
              >
                <i className="iconfont">&#xe64d;</i>
              </div>
              <div
                data-tip="对话信息"
                className={inputType==='speak'?"tool-item active":"tool-item"}
                onClick={() => this.setState({inputType: 'speak'})}
              >
                <i className="iconfont">&#xe61f;</i>
              </div>
              <div
                data-tip="行动信息"
                className={inputType==='action'?"tool-item active":"tool-item"}
                onClick={() => this.setState({inputType: 'action'})}
              >
                <i className="iconfont">&#xe619;</i>
              </div>
            </div>
            <textarea
              ref="inputMsg"
              className="input-msg"
              value={this.state.inputMsg}
              onChange={(e)=>this.setState({inputMsg:e.target.value})} />
          </div>
          <div className="action-area">
            <button onClick={() => this._handleSendMsg()} disabled={this.state.inputMsg?false:true}>发送</button>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = connect(
  state => ({
    userUUID: state.getIn(['user','info','uuid']),
    usercache: state.getIn(['cache', 'user'])
  })
)(ConverseDetail);
