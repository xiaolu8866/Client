import React from 'react';
import { connect } from 'react-redux';
import ModalPanel from '../../../components/ModalPanel';
import { createTemplateAdvanced } from '../../../../redux/actions/actor';

require('./TemplateAdvancedCreate.scss');

class TemplateAdvancedCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templateStr: '',
    };
  }

  _handleCreateTemplate() {
    this.props.dispatch(
      createTemplateAdvanced('', '', '', this.state.templateStr)
    );
  }

  getActions() {
    return (
      <div>
        <button onClick={() => this._handleCreateTemplate()}>创建模板</button>
      </div>
    );
  }

  render() {
    return (
      <ModalPanel
        className="template-advanced-create"
        title={'进阶模板导入'}
        actions={this.getActions()}
      >
        <p>模板内容:</p>
        <textarea
          value={this.state.templateStr}
          onChange={(e) => this.setState({ templateStr: e.target.value })}
        />
      </ModalPanel>
    );
  }
}

export default connect()(TemplateAdvancedCreate);
