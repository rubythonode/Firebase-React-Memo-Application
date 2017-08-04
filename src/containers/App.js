import React, { Component } from 'react';
import firebase from 'firebase';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { List, Map } from 'immutable';

// 컴포넌트 불러오기
import { Memo, Create, Search, Header, Container, MemoList, Modal, Fixed, Dimmed, Control, Nav } from '../components';


// 환경 설정 객체 불러오기
import config from '../config';

class App extends Component {
  constructor(props) {
    super(props);

    // 파이어베이스 설정 및 사용 데이터베이스 선택
    this.app = firebase.initializeApp(config);
    this.db = this.app.database().ref().child('memos');
  }

  // 웹 애플리케이션 상태

  /*
    memos: 메모가 담기는 배열
    keyword: 사용자가 검색하는 키워드
    modal: 모달창을 띄우기 위한 객체
    nav: 슬라이드메뉴를 띄우기 위한 객체
  */
  state = {
    memos: List(),
    keyword: '',
    modal: Map({
      mode: '',
      visible: false,
      memo: Map({})
    }),
    nav: Map({
      visible: false
    })
  }

  componentWillMount() {

    // 실시간 데이터 추가시
    this.db.on('child_added', snap => {
      const { memos } = this.state;

      // 데이터 추가
      this.setState({
        memos: memos.push(Map({
            id: snap.key,
            content: snap.val().content
        }))
      })
    });

    // 실시간 데이터 삭제시
    this.db.on('child_removed', snap => {
      const { memos } = this.state;

      /*
        삭제된 데이터 객체의 key 값과 메모의 id 값 비교 후 같지 않은 것만 배열에 담는다.
        즉, 삭제될 데이터 빼고는 배열에 담긴다.
      */
      this.setState({
        memos: memos.filter(item => item.toJS().id !== snap.key)
      })
    })

    this.db.on('child_changed', snap => {
      const { memos } = this.state;

      // 수정해야할 아이템의 인덱스를 찾는다.
      const index = memos.findIndex(memo => memo.toJS().id === snap.key)

      // index 번째 아이템의 content를 수정된 content 값으로 변화시킨후 배열에 담는다.
      this.setState({
        memos: memos.setIn([index, 'content'], snap.val().content)
      });

    })
  }

  // nav와 관련된 객체

  navHandle = {
      // nav 열기
      open: () => {
        this.setState({
          nav: Map({
            visible: true
          })
        })
      },
      // nav 닫기
      hide: () => {
        this.setState({
          nav: Map({
            visible: false
          })
        })
      }

  }

  modalHandle = {
    // modal 열기
    open: (mode, memo) => {

      // 수정을 위해 받은 데이터를 state에 반영
      this.setState({
        modal: Map({
          visible: true,
          mode,
          memo: Map({
            id: memo.id,
            content: memo.content
          })
        })
      })
    },

    hide: () => {

      this.setState({
        modal: Map({
          visible: false,
          mode: 'ModalHide'
        })
      })
    }
  }


  // 메모 핸들링
  memoHandle = {
    // 메모 추가
    createMemo: (memo) => {
      this.db.push().set({ content: memo });
    },

    // 메모 삭제 및 모달 비활성화
    removeMemo: (id) => {
      firebase.database().ref('memos').child(id).remove();

      this.setState({
        modal: Map({
          visible: false,
          mode: 'removeOrupdate'
        })
      })
    },

    // 메모 내용 수정 및 모달 비활성화
    updateMemo: (id, memo) => {
      if(memo != null) {
        var update = {};

        update[id] = {
          content: memo
        };

        this.db.update(update);

        this.setState({
          modal: Map({
            visible: false,
            mode: 'removeOrupdate'
          })
        })
      }
      return;
    }
  }

  stateHandle = {
    updateKeyword: (keyword) => {
      this.setState({
        keyword
      })
    }
  }

  render() {

    // 핸들링 객체 모음
    const {
      navHandle,
      modalHandle,
      memoHandle,
      stateHandle
    } = this;

    // 애플리케이션 상태
    const {
      memos,
      keyword,
      modal,
      nav
    } = this.state;

    // 메모 랜더링 함수 ( 필터링 및 반복)
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
            onClick={() => { modalHandle.open('control', memo.toJS()) }}
          />
        )
      })
    }
    return (
      <div>
        <Header
            navOpen={navHandle.open}
          />
        <Container>
          <Search updateKeyword={stateHandle.updateKeyword}/>
          <MemoList>

            <ReactCSSTransitionGroup
              transitionName="init"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {memolist(memos)}
            </ReactCSSTransitionGroup>

          </MemoList>

        </Container>
        <Modal
          modalClose={modalHandle.hide}
          visible={modal.toJS().visible}
        >
          {
            modal.toJS().mode === 'create' ? (
              <Create
                createMemo={memoHandle.createMemo}
                modalClose={modalHandle.hide}
                />
            ) : (
              <Control
                  memo={modal.toJS().memo}
                  removeMemo={memoHandle.removeMemo}
                  updateMemo={memoHandle.updateMemo}
                />
            )
          }
        </Modal>
        <Nav
            navClose={navHandle.hide}
            visible={nav.toJS().visible}
          >
        </Nav>
        <Fixed
          modalOpen={modalHandle.open}
          />
        <Dimmed
          visible={modal.toJS().visible || nav.toJS().visible}
          />
      </div>
    );
  }
}

export default App;
