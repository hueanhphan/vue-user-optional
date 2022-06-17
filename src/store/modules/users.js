import axios from "axios";

const state = {
  users: [],
};
const getters = {
  listUser: (state) => state.users,
};
const actions = {
  async addUser({ commit }, user) {
    const res = await axios.post(
      "https://628efc440e69410599d36fda.mockapi.io/usermanagement/user",
      user
    );
    // check data
    commit("addUser", res.data);
  },
  async fetchUsers({ commit }) {
    const res = await axios.get(
      "https://628efc440e69410599d36fda.mockapi.io/usermanagement/user"
    );
    commit("setUsers", res.data);
  },
  async deleteUser({ commit }, id) {
    await axios.delete(
      `https://628efc440e69410599d36fda.mockapi.io/usermanagement/user/${id}`
    );
    commit("deleteUser", id);
  },
  async updateUser({ commit }, user) {
    const res = await axios.put(
      `https://628efc440e69410599d36fda.mockapi.io/usermanagement/user/${user.id}`,
      user
    );
    commit("updateUser", res.data);
  },
};
const mutations = {
  addUser: (state, user) => state.users.push(user),
  setUsers: (state, users) => (state.users = users),
  deleteUser: (state, id) =>
    (state.users = state.users.filter((user) => user.id !== id)),
  updateUser: (state, user) => {
    const index = state.users.findIndex((u) => u.id === user.id);
    if (index != -1) {
      state.users.splice(index, 1, user);
    }
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
