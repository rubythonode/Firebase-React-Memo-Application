import React, { Component } from 'react';
import firebase from 'firebase';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Memo, Create, Search, Header, Container, MemoList, Modal, Fixed, Dimmed, Control } from '../components';
import { List, Map } from 'immutable';

class App extends Component {
  state = {
    memos: List(),
    keyword: '',
    modal: Map({
      mode: '',
      visible: false,
      memo: Map({})
    })

  }

  componentWillMount() {
    const db = firebase.database().ref().child('memos');
    db.on('child_added', snap => {
      const { memos } = this.state;
      this.setState({
        memos: memos.push(Map({
            id: snap.key,
            content: snap.val().content
        }))
      })
    });

    db.on('child_removed', snap => {
      const { memos } = this.state;
      this.setState({
        memos: memos.filter(item => item.toJS().id !== snap.key)
      })
    })

    db.on('child_changed', snap => {
      const { memos } = this.state;

      const index = memos.findIndex(memo => memo.toJS().id == snap.key)
      this.setState({
        memos: memos.setIn([index, 'content'], snap.val().content)
      });

    })
  }


  modalOpen = (mode, memo) => {
    const { modal } = this.state;

    this.setState({
      modal: Map({
        visible: true,
        mode,
        memo: Map({
          id: memo.id,
          content: memo.content
        })
      })
    });
  }

  modalClose = () => {
    const { modal } = this.state;

    this.setState({
      modal: Map({
        visible: false,
        mode: 'none'
      })
    })
  }

  createMemo = (memo) => {
    const db = firebase.database().ref().child('memos');
    db.push().set({ content: memo });
  }

  removeMemo = (id) => {
    firebase.database().ref('memos').child(id).remove();
    const { modal } = this.state;

    this.setState({
      modal: Map({
        visible: false,
        mode: 'none'
      })
    })
  }

  updateMemo = (id, memo) => {
    var database = firebase.database();
    var memosRef = database.ref().child('memos');
    if(memo != null) {
      var update = {};

      update[id] = {
        content: memo
      };

      memosRef.update(update);

      this.setState({
        modal: Map({
          visible: false,
          mode: 'none'
        })
      })
    }
    return;
  }

  updateKeyword = (keyword) => {
      this.setState({
        keyword
      });
  }

  render() {
    const { memos, keyword, modal: { visible, mode, memo } } = this.state;

    // console.log("test : "+this.state.modal.toJS().mode);
    const memolist = (data) => {
      data = data.filter(
        (memo) => {
          return memo.toJS().content.indexOf(keyword) > -1;
        }
      );

      return data.map((memo, index) => {
        return (
          <Memo
            memo={memo.toJS()}
            index={index}
            key={index}
            onClick={() => { this.modalOpen('control', memo.toJS()) }}
          />
        )
      })
    }
    return (
      <div>
        <Header/>
        <Container>
          <Search updateKeyword={this.updateKeyword}/>
          <MemoList>

            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {memolist(memos)}
            </ReactCSSTransitionGroup>

          </MemoList>

        </Container>
        <Modal
          modalClose={this.modalClose}
          visible={this.state.modal.toJS().visible}
        >
          {
            this.state.modal.toJS().mode == 'create' ? (
              <Create
                createMemo={this.createMemo}
                modalClose={this.modalClose}
                />
            ) : (
              <Control
                  memo={this.state.modal.toJS().memo}
                  removeMemo={this.removeMemo}
                  updateMemo={this.updateMemo}
                />
            )
          }
        </Modal>
        <Fixed
          modalOpen={this.modalOpen}
          />

        <Dimmed
          visible={this.state.modal.toJS().visible}
          />
      </div>
    );
  }
}

export default App;
