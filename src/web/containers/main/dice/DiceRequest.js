import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { setLastDiceType } from '../../../../redux/actions/ui';

require('./DiceRequest.scss');

class DiceRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceType: this.props.lastDiceType || 'basicDice',
      diceReason: '',
      favoriteDiceValue: '',
    };
  }

  _handleSendReq() {
    let diceExp = '';
    if (this.state.diceType === 'basicDice') {
      diceExp = this.refs.diceNum.value + 'd' + this.refs.diceFace.value;
    } else if (this.state.diceType === 'complexDice') {
      diceExp = this.refs.diceExp.value;
    } else if (this.state.diceType === 'favoriteDice') {
      diceExp =
        this.state.favoriteDiceValue + '+' + (this.refs.diceTempAdd.value || 0);
    }

    console.log(`因为 ${this.state.diceReason} 请求投出: ${diceExp}`);
    if (this.props.onSendDiceRequest) {
      this.props.onSendDiceRequest(this.state.diceReason, diceExp);
    }
  }
  _handleChangeDiceType(type) {
    this.setState({ diceType: type });
    this.props.dispatch(setLastDiceType(type));
  }

  render() {
    let diceTypeOptions = [
      { value: 'basicDice', label: '基本骰' },
      { value: 'complexDice', label: '复合骰' },
      { value: 'favoriteDice', label: '常用骰' },
    ];
    let favoriteDice = this.props.favoriteDice
      .map((i) => ({
        value: i.get('value'),
        label: `${i.get('title')}(${i.get('value')})`,
      }))
      .toJS();
    return (
      <div className="dice-request">
        <span>因为</span>
        <input
          type="text"
          className="dice-reason"
          placeholder="投骰理由"
          value={this.state.diceReason}
          onChange={(e) => this.setState({ diceReason: e.target.value })}
        />
        <span>
          请求投骰<i className="iconfont">&#xe609;</i>
        </span>
        <Select
          name="dice-select"
          className="dice-select"
          value={this.state.diceType}
          options={diceTypeOptions}
          clearable={false}
          searchable={false}
          placeholder="请选择骰子类型..."
          onChange={(item) => this._handleChangeDiceType(item.value)}
        />
        {this.state.diceType === 'basicDice' ? (
          <div className="dice basicDice">
            <input
              key="dicereq-diceNum"
              type="number"
              placeholder="骰数"
              defaultValue="1"
              ref="diceNum"
            />
            <span>d</span>
            <input
              key="dicereq-diceFace"
              type="number"
              placeholder="骰面"
              defaultValue="100"
              ref="diceFace"
            />
          </div>
        ) : this.state.diceType === 'complexDice' ? (
          <div className="dice complexDice">
            <input
              key="dicereq-diceExp"
              type="text"
              placeholder="请输入骰子表达式"
              ref="diceExp"
              defaultValue="1d100"
            />
          </div>
        ) : (
          <div className="dice favoriteDice">
            <Select
              name="dice-favorite-select"
              className="dice-favorite-select"
              value={this.state.favoriteDiceValue}
              options={favoriteDice}
              clearable={false}
              searchable={false}
              placeholder="请选择常用骰"
              onChange={(item) =>
                this.setState({ favoriteDiceValue: item.value })
              }
            />
            <input
              key="dicereq-diceTempAdd"
              type="number"
              placeholder="临时加值"
              ref="diceTempAdd"
              defaultValue="0"
            />
          </div>
        )}
        <button onClick={() => this._handleSendReq()}>发送申请</button>
      </div>
    );
  }
}

export default connect((state) => ({
  lastDiceType: state.getIn(['ui', 'lastDiceType']),
  favoriteDice: state.getIn(['settings', 'user', 'favoriteDice']),
}))(DiceRequest);
