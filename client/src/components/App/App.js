import "./App.css";
import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppContext from "../../state/AppContext";

import AuthGuard from "../AuthGuard";
import LoginForm from "../LoginForm";
import ProjectList from "../ProjectList";
import ProjectForm from "../ProjectForm/ProjectForm";
import TaskList from "../TaskList";
import TaskForm from "../TaskForm";
import TaskDetails from "../TaskDetails";
import Dashboard from "../Dashboard";

import UserStore from "../../state/stores/UserStore";
import ProjectStore from "../../state/stores/ProjectStore";
import TaskStore from "../../state/stores/TaskStore";
import UserSuggestionStore from "../../state/stores/UserSuggestionStore";
import ErrorDisplay from "../ErrorDisplay";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStore] = useState(new UserStore());
  const [projectStore] = useState(new ProjectStore());
  const [taskStore] = useState(new TaskStore());
  const [userSuggestionStore] = useState(new UserSuggestionStore());
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await userStore.validateToken();
      setIsAuthenticated(isValid);
      setAuthChecked(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    userStore.emitter.addListener("LOGIN_SUCCESS", () => {
      setIsAuthenticated(true);
    });
    userStore.emitter.addListener("LOGOUT_SUCCESS", () => {
      setIsAuthenticated(false);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user: userStore,
        project: projectStore,
        task: taskStore,
        userSuggestion: userSuggestionStore,
      }}
    >
      <Router>
        {authChecked && isAuthenticated && (
          <div className="app-header">
            <div>
              <h5>Welcome, {userStore.data.email}</h5>
            </div>
            <div>
              <button
                onClick={() => {
                  userStore.logout();
                  setIsAuthenticated(false);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        <ErrorDisplay />
        {authChecked && (
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
              }
            />
            <Route
              path="/"
              element={
                <AuthGuard isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/dashboard/:type"
              element={
                <AuthGuard isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/projects"
              element={
                <AuthGuard isAuthenticated={isAuthenticated}>
                  <ProjectList />
                </AuthGuard>
              }
            />
            <Route
              path="/projects/new"
              element={
                <AuthGuard isAuthenticated={isAuthenticated}>
                  <ProjectForm />
                </AuthGuard>
              }
            />
            <Route
              path="/projects/:pid/tasks"
              element={
                <AuthGuard isAuthenticated={isAuthenticated}>
                  <TaskList />
                </AuthGuard>
              }
            />
            <Route
              path="/projects/:pid/tasks/new"
              element={
                <AuthGuard isAuthenticated={isAuthenticated}>
                  <TaskForm />
                </AuthGuard>
              }
            />
            <Route
              path="/projects/:pid/tasks/:tid"
              element={
                <AuthGuard isAuthenticated={isAuthenticated}>
                  <TaskDetails />
                </AuthGuard>
              }
            />
          </Routes>
        )}
      </Router>
    </AppContext.Provider>
  );
};

export default App;
