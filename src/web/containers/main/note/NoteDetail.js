import Loadable from 'react-loadable';
import React from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { connect } from 'react-redux';
import { saveNote } from '../../../../redux/actions/note';
const NoteEditor = Loadable({
  loader: () => import('../../../components/NoteEditor'),
  loading: LoadingSpinner,
});

require('./NoteDetail.scss');

class NoteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note.title,
      content: props.note.content,
    };
  }

  _handleSave() {
    console.log('笔记本存储中....');
    let uuid = this.props.uuid;
    let title = this.state.title;
    let content = this.state.content;
    this.props.dispatch(saveNote(uuid, title, content));
  }

  render() {
    return (
      <div className="note-detail">
        <div className="title">
          <input
            type="text"
            placeholder="笔记标题"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
            onBlur={() => this._handleSave()}
          />
        </div>
        <NoteEditor
          value={this.state.content}
          onChange={(content) => this.setState({ content })}
          onSave={() => this._handleSave()}
        />
      </div>
    );
  }
}
export default connect()(NoteDetail);
