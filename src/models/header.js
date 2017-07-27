
export default {

  namespace: 'header',

  state: {
    current:'home',
    isNavbar: document.body.clientWidth<769,
    menuPopoverVisible:false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      let getFromReg = new RegExp(/^#\/(\w+)\?/,'i')
      const current =getFromReg.exec(location.hash)
      dispatch({
        type:'test',
        action:{
          key:current?current[1]:'home'
        }
      })
      let tid
      window.onresize=()=>{
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *changeNavbar ({
      payload,
    }, { put, select }) {
      const { header } = yield(select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      console.log(header)
      if (isNavbar !== header.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },
  },

  reducers: {
    test(state,{action}){
      const key = action.key;
      return {
        ...state,
        current:key,
      };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
    switchMenuPopover (state) {
      console.log('switchMenuPopver')
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    }, 
    handleNavbar (state, { payload }) {
      console.log('handleNavbar')
      return {
        ...state,
        isNavbar: payload,
      }
    },
  },
};
