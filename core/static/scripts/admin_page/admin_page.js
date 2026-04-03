(() => {
  // ui_objects/calendar.ts
  var CalendarUI = class {
    //Constructor
    constructor() {
      //Const
      this.months = [
        "\u042F\u043D\u0432\u0430\u0440\u044C",
        "\u0424\u0435\u0432\u0440\u0430\u043B\u044C",
        "\u041C\u0430\u0440\u0442",
        "\u0410\u043F\u0440\u0435\u043B\u044C",
        "\u041C\u0430\u0439",
        "\u0418\u044E\u043D\u044C",
        "\u0418\u044E\u043B\u044C",
        "\u0410\u0432\u0433\u0443\u0441\u0442",
        "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C",
        "\u041E\u043A\u0442\u044F\u0431\u0440\u044C",
        "\u041D\u043E\u044F\u0431\u0440\u044C",
        "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"
      ];
      //Date
      this.currentDate = /* @__PURE__ */ new Date();
      this.currentYear = this.currentDate.getFullYear();
      this.currentMonth = this.currentDate.getMonth();
      this.currentDay = this.currentDate.getDate();
      //Elements
      this.calendarDiv = document.querySelector(".calendar");
      this.calendarMonthYearDiv = document.querySelector(".calendar__month-and-year-name");
      this.calendarDayNumbersDiv = document.querySelector(".calendar__day-numbers");
      //Create UI on page
      this.create = () => {
        let week = document.createElement("div");
        week.classList.add("calendar__day-numbers-row");
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        let firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        if (firstDay === 0) firstDay = 7;
        for (let i = 1; i < 8; i++) {
          let day = document.createElement("span");
          let dayNumber = document.createElement("div");
          day.classList.add("calendar__day-cell");
          day.id = `d${new Date(this.currentYear, this.currentMonth, i - firstDay + 2).toISOString().slice(0, 10)}`;
          dayNumber.classList.add("calendar__day-number");
          dayNumber.innerText = `${new Date(this.currentYear, this.currentMonth, i - firstDay + 1).getDate()}`;
          i < firstDay && dayNumber.classList.add("calendar__day-cell--previous");
          (new Date(this.currentYear, this.currentMonth, +i - firstDay + 1).getDay() > 5 || new Date(this.currentYear, this.currentMonth, +i - firstDay + 1).getDay() == 0) && day.classList.add("calendar__day-cell--weekend");
          day.append(dayNumber);
          week.append(day);
        }
        this.calendarDayNumbersDiv.append(week);
        week = document.createElement("div");
        week.classList.add("calendar__day-numbers-row");
        for (let i = 9 - firstDay; i < daysInMonth + 1; i++) {
          let day = document.createElement("span");
          let dayNumber = document.createElement("div");
          day.classList.add("calendar__day-cell");
          day.id = `d${new Date(this.currentYear, this.currentMonth, i + 1).toISOString().slice(0, 10)}`;
          dayNumber.classList.add("calendar__day-number");
          dayNumber.innerText = i.toString();
          i == this.currentDay && day.classList.add("calendar__day-number--current");
          (new Date(this.currentYear, this.currentMonth, i).getDay() > 5 || new Date(this.currentYear, this.currentMonth, i).getDay() == 0) && day.classList.add("calendar__day-cell--weekend");
          day.append(dayNumber);
          week.append(day);
          if (new Date(this.currentYear, this.currentMonth, i).getDay() == 0 || i == daysInMonth) {
            if (i == daysInMonth && new Date(this.currentYear, this.currentMonth, i).getDay() != 0) {
              for (let j = 1; j < 8 - new Date(this.currentYear, this.currentMonth, i).getDay(); j++) {
                let day2 = document.createElement("span");
                let dayNumber2 = document.createElement("div");
                day2.classList.add("calendar__day-cell");
                day2.classList.add("calendar__day-cell--next");
                day2.id = `d${new Date(this.currentYear, this.currentMonth + 1, j + 1).toISOString().slice(0, 10)}`;
                dayNumber2.classList.add("calendar__day-number");
                dayNumber2.innerText = j.toString();
                (new Date(this.currentYear, this.currentMonth + 1, j).getDay() > 5 || new Date(this.currentYear, this.currentMonth + 1, j).getDay() == 0) && day2.classList.add("calendar__day-cell--weekend");
                day2.append(dayNumber2);
                week.append(day2);
              }
            }
            this.calendarDayNumbersDiv.append(week);
            if (i != daysInMonth) {
              week = document.createElement("div");
              week.classList.add("calendar__day-numbers-row");
            }
          }
        }
      };
      // Add note to calendar
      this.addNoteToDate = (name, date, application, noteClick = this.noteOnClick) => {
        const noteDiv = document.createElement("div");
        noteDiv.innerText = name;
        noteDiv.classList.add("calendar__day-note");
        noteDiv.addEventListener("click", (e) => noteClick(e, application));
        try {
          document.querySelector(`#d${date.toISOString().slice(0, 10)}`).appendChild(noteDiv);
        } catch (error) {
          console.error(error);
        }
      };
      // function for note on click
      this.noteOnClick = (e, note) => {
        alert(`\u0412\u0440\u0435\u043C\u044F \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044F = ${note.time}`);
      };
      // Clean UI
      this.clean = () => {
      };
      this.calendarMonthYearDiv.innerText = this.months[this.currentMonth - 1].toString() + " " + this.currentYear.toString() + " \u0433.";
    }
  };

  // ui_objects/table.ts
  var TableUI = class {
    constructor() {
      //Const string massives
      this.headers = [
        "\u0414\u0430\u0442\u0430 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F",
        "\u0412\u0440\u0435\u043C\u044F \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F",
        "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F",
        "\u0412\u044B\u0441\u0448\u0430\u044F \u0448\u043A\u043E\u043B\u0430",
        "\u041A\u0443\u0440\u0441",
        "\u0413\u0440\u0443\u043F\u043F\u0430",
        "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439",
        "\u0424\u0418\u041E \u0441\u043E\u043F\u0440\u043E\u0432\u043E\u0436\u0434\u0430\u044E\u0449\u0435\u0433\u043E",
        "\u0422\u0435\u043B\u0435\u0444\u043E\u043D\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0441\u043E\u043F\u0440\u043E\u0432\u043E\u0436\u0434\u0430\u044E\u0449\u0435\u0433\u043E",
        "\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u044F\u0432\u043A\u0438",
        "\u0421\u0442\u0430\u0442\u0443\u0441 \u044D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u0438",
        "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C",
        "\u0420\u0435\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432"
      ];
      //Applications 
      this.applications = [];
      //Elements
      this.tableDiv = document.querySelector(".table");
      // Create UI on page
      this.create = () => {
        const table_headers_row = document.createElement("tr");
        for (let header of this.headers) {
          const table_head = document.createElement("th");
          table_head.innerText = header;
          table_headers_row.append(table_head);
        }
        this.tableDiv.append(table_headers_row);
        for (const application of this.applications) {
          this.addRow(application);
        }
      };
      this.clean = () => {
        this.tableDiv.innerHTML = "";
      };
      // Add row
      this.addRow = (application) => {
        const table_row = document.createElement("tr");
        for (const field of application.getTableDataType()) {
          const table_data = document.createElement("td");
          const element_in_cell = document.createElement(field.element);
          const keys = Object.keys(field.option);
          const values = Object.values(field.option);
          for (let i = 0; i < keys.length; i++) {
            const option = document.createElement("option");
            option.value = keys[i];
            option.innerText = values[i];
            if (option.value == field.value) option.selected = true;
            element_in_cell.append(option);
          }
          if (keys.length == 0) {
            element_in_cell.value = field.value;
            try {
              element_in_cell.type = field.type;
            } catch (_) {
            }
            ;
          }
          table_data.append(element_in_cell);
          table_row.append(table_data);
        }
        this.tableDiv.append(table_row);
      };
    }
    setApplications(applications) {
      this.applications = applications;
    }
  };

  // objects/application.ts
  var ApplicationStatus = /* @__PURE__ */ ((ApplicationStatus2) => {
    ApplicationStatus2["SUBMITTED"] = "\u041F\u0440\u0438\u043D\u044F\u0442\u0430";
    ApplicationStatus2["NEEDSEDITING"] = "\u041D\u0443\u0436\u043D\u043E \u043E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C";
    ApplicationStatus2["ACCEPTED"] = "\u041F\u0440\u0438\u043D\u044F\u0442\u0430";
    return ApplicationStatus2;
  })(ApplicationStatus || {});
  var ExcursionStatus = /* @__PURE__ */ ((ExcursionStatus2) => {
    ExcursionStatus2["WAITING"] = "\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0435\u043D\u0438\u044F";
    ExcursionStatus2["ACCEPTED"] = "\u041F\u0440\u0438\u043D\u044F\u0442\u0430";
    ExcursionStatus2["MOVED"] = "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0435\u043D\u0430";
    ExcursionStatus2["CANCELLED"] = "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u0430";
    ExcursionStatus2["SUCCEED"] = "\u041F\u0440\u043E\u0448\u043B\u0430";
    return ExcursionStatus2;
  })(ExcursionStatus || {});
  var HigherSchool = /* @__PURE__ */ ((HigherSchool2) => {
    HigherSchool2["higher_school_0"] = "-";
    HigherSchool2["higher_school_1"] = "\u0412\u0428\u0418\u0422\u0410\u0421";
    HigherSchool2["higher_school_2"] = "\u0412\u0418\u0428";
    HigherSchool2["higher_school_3"] = "\u0412\u0428\u0421\u0413\u041D\u0438\u041C\u041A";
    HigherSchool2["higher_school_4"] = "\u0412\u0428\u042D\u041D\u0438\u0413";
    HigherSchool2["higher_school_5"] = "\u0412\u0428\u041F\u041F\u0438\u0424\u041A";
    HigherSchool2["higher_school_6"] = "\u0412\u0428\u042D\u0423\u0438\u041F";
    HigherSchool2["higher_school_7"] = "\u0412\u0428\u0415\u041D\u0438\u0422";
    HigherSchool2["higher_school_8"] = "\u0412\u0428\u0420\u0438\u041C\u0422";
    HigherSchool2["higher_school_9"] = "\u0422\u041A \u0418\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u041F\u0435\u0442\u0440\u0430 I";
    HigherSchool2["higher_school_10"] = "\u0413\u0443\u043C\u0418\u043D";
    HigherSchool2["higher_school_11"] = "\u0418\u0421\u041C\u0410\u0420\u0422";
    HigherSchool2["higher_school_12"] = "\u0422\u041A (\u0421\u0435\u0432\u0435\u0440\u043E\u0434\u0432\u0438\u043D\u0441\u043A)";
    return HigherSchool2;
  })(HigherSchool || {});
  var TableDataType = class {
    get value() {
      return this._value;
    }
    get element() {
      return this._element;
    }
    get type() {
      return this._type;
    }
    get option() {
      return this._option;
    }
    constructor(value, element, type, option) {
      this._value = value;
      this._element = element;
      this._type = type;
      this._option = option;
    }
  };
  var Application = class {
    constructor() {
      this.getTableDataType = () => {
        const formattedTime = this.visit_time.slice(0, 5);
        return [
          new TableDataType(this.visit_date, "input", "date", {}),
          new TableDataType(formattedTime, "input", "time", {}),
          new TableDataType(this.organization, "input", "string", {}),
          new TableDataType(this.higher_school, "select", "enum", HigherSchool),
          new TableDataType(this.course, "input", "number", {}),
          new TableDataType(this.group_of, "input", "number", {}),
          new TableDataType(this.count_of_customers, "input", "number", {}),
          new TableDataType(this.name_of_accompanying, "input", "string", {}),
          new TableDataType(this.phone_number_of_accompanying, "input", "string", {}),
          new TableDataType(this.application_status, "select", "enum", ApplicationStatus),
          new TableDataType(this.excursion_status, "select", "enum", ExcursionStatus),
          new TableDataType(this.feedback, "textarea", "string", {}),
          new TableDataType(this.real_count_of_customers > 0 ? this.real_count_of_customers : "", "input", "number", {})
        ];
      };
    }
    //Date
    get date() {
      return new Date(this.visit_date);
    }
    get dateString() {
      return new Date(this.visit_date).toISOString().slice(0, 10);
    }
    //Time
    get time() {
      return this.visit_time.slice(0, 5);
    }
  };

  // node_modules/websocket-ts/dist/esm/src/backoff/constantbackoff.js
  var ConstantBackoff = class {
    /**
     * Creates a new ConstantBackoff.
     * @param backoff the backoff-time to return
     */
    constructor(backoff) {
      this._retries = 0;
      if (!Number.isInteger(backoff) || backoff < 0) {
        throw new Error("Backoff must be a positive integer");
      }
      this.backoff = backoff;
    }
    get retries() {
      return this._retries;
    }
    get current() {
      return this.backoff;
    }
    next() {
      this._retries++;
      return this.backoff;
    }
    reset() {
      this._retries = 0;
    }
  };

  // node_modules/websocket-ts/dist/esm/src/websocket_event.js
  var WebsocketEvent = {
    /** Fired when the connection is opened. */
    open: "open",
    /** Fired when the connection is closed. */
    close: "close",
    /** Fired when the connection has been closed because of an error, such as when some data couldn't be sent. */
    error: "error",
    /** Fired when a message is received. */
    message: "message",
    /** Fired when the websocket tries to reconnect after a connection loss. */
    retry: "retry",
    /** Fired when the websocket successfully reconnects after a connection loss. */
    reconnect: "reconnect"
  };

  // node_modules/websocket-ts/dist/esm/src/websocket.js
  var Websocket = class {
    /**
     * Creates a new websocket.
     *
     * @param url to connect to, or a function that returns a URL.
     * @param protocols optional protocols to use.
     * @param options optional options to use.
     */
    constructor(url, protocols, options) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
      this._closedByUser = false;
      this.handleOpenEvent = (event) => this.handleEvent(WebsocketEvent.open, event);
      this.handleErrorEvent = (event) => this.handleEvent(WebsocketEvent.error, event);
      this.handleCloseEvent = (event) => this.handleEvent(WebsocketEvent.close, event);
      this.handleMessageEvent = (event) => this.handleEvent(WebsocketEvent.message, event);
      this._urlProvider = url;
      this._protocols = protocols;
      this._options = {
        buffer: options === null || options === void 0 ? void 0 : options.buffer,
        retry: {
          maxRetries: (_a = options === null || options === void 0 ? void 0 : options.retry) === null || _a === void 0 ? void 0 : _a.maxRetries,
          instantReconnect: (_b = options === null || options === void 0 ? void 0 : options.retry) === null || _b === void 0 ? void 0 : _b.instantReconnect,
          backoff: (_c = options === null || options === void 0 ? void 0 : options.retry) === null || _c === void 0 ? void 0 : _c.backoff
        },
        listeners: {
          open: [...(_e = (_d = options === null || options === void 0 ? void 0 : options.listeners) === null || _d === void 0 ? void 0 : _d.open) !== null && _e !== void 0 ? _e : []],
          close: [...(_g = (_f = options === null || options === void 0 ? void 0 : options.listeners) === null || _f === void 0 ? void 0 : _f.close) !== null && _g !== void 0 ? _g : []],
          error: [...(_j = (_h = options === null || options === void 0 ? void 0 : options.listeners) === null || _h === void 0 ? void 0 : _h.error) !== null && _j !== void 0 ? _j : []],
          message: [...(_l = (_k = options === null || options === void 0 ? void 0 : options.listeners) === null || _k === void 0 ? void 0 : _k.message) !== null && _l !== void 0 ? _l : []],
          retry: [...(_o = (_m = options === null || options === void 0 ? void 0 : options.listeners) === null || _m === void 0 ? void 0 : _m.retry) !== null && _o !== void 0 ? _o : []],
          reconnect: [...(_q = (_p = options === null || options === void 0 ? void 0 : options.listeners) === null || _p === void 0 ? void 0 : _p.reconnect) !== null && _q !== void 0 ? _q : []]
        }
      };
      this._underlyingWebsocket = this.tryConnect();
    }
    /**
     * Getter for the url.
     *
     * @return the url.
     */
    get url() {
      return this._url;
    }
    /**
     * Getter for the protocols.
     *
     * @return the protocols, or undefined if none were provided.
     */
    get protocols() {
      return this._protocols;
    }
    /**
     * Getter for the buffer.
     *
     * @return the buffer, or undefined if none was provided.
     */
    get buffer() {
      return this._options.buffer;
    }
    /**
     * Getter for the maxRetries.
     *
     * @return the maxRetries, or undefined if none was provided (no limit).
     */
    get maxRetries() {
      return this._options.retry.maxRetries;
    }
    /**
     * Getter for the instantReconnect.
     *
     * @return the instantReconnect, or undefined if none was provided.
     */
    get instantReconnect() {
      return this._options.retry.instantReconnect;
    }
    /**
     * Getter for the backoff.
     *
     * @return the backoff, or undefined if none was provided.
     */
    get backoff() {
      return this._options.retry.backoff;
    }
    /**
     * Whether the websocket was closed by the user. A websocket is closed by the user by calling close().
     *
     * @return true if the websocket was closed by the user, false otherwise.
     */
    get closedByUser() {
      return this._closedByUser;
    }
    /**
     * Getter for the last 'open' event, e.g. the last time the websocket was connected.
     *
     * @return the last 'open' event, or undefined if the websocket was never connected.
     */
    get lastConnection() {
      return this._lastConnection;
    }
    /**
     * Getter for the underlying websocket. This can be used to access the browser's native websocket directly.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
     * @return the underlying websocket.
     */
    get underlyingWebsocket() {
      return this._underlyingWebsocket;
    }
    /**
     * Getter for the readyState of the underlying websocket.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
     * @return the readyState of the underlying websocket.
     */
    get readyState() {
      return this._underlyingWebsocket.readyState;
    }
    /**
     * Getter for the bufferedAmount of the underlying websocket.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/bufferedAmount
     * @return the bufferedAmount of the underlying websocket.
     */
    get bufferedAmount() {
      return this._underlyingWebsocket.bufferedAmount;
    }
    /**
     * Getter for the extensions of the underlying websocket.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/extensions
     * @return the extensions of the underlying websocket.
     */
    get extensions() {
      return this._underlyingWebsocket.extensions;
    }
    /**
     * Getter for the binaryType of the underlying websocket.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/binaryType
     * @return the binaryType of the underlying websocket.
     */
    get binaryType() {
      return this._underlyingWebsocket.binaryType;
    }
    /**
     * Setter for the binaryType of the underlying websocket.
     *
     * @param value to set, 'blob' or 'arraybuffer'.
     */
    set binaryType(value) {
      this._underlyingWebsocket.binaryType = value;
    }
    /**
     * Sends data over the websocket.
     *
     * If the websocket is not connected and a buffer was provided on creation, the data will be added to the buffer.
     * If no buffer was provided or the websocket was closed by the user, the data will be dropped.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     * @param data to send.
     */
    send(data) {
      if (this.closedByUser)
        return;
      if (this._underlyingWebsocket.readyState === this._underlyingWebsocket.OPEN) {
        this._underlyingWebsocket.send(data);
      } else if (this.buffer !== void 0) {
        this.buffer.add(data);
      }
    }
    /**
     * Close the websocket. No connection-retry will be attempted after this.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close
     * @param code optional close code.
     * @param reason optional close reason.
     */
    close(code, reason) {
      this.cancelScheduledConnectionRetry();
      this._closedByUser = true;
      this._underlyingWebsocket.close(code, reason);
    }
    /**
     * Adds an event listener for the given event-type.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
     * @param type of the event to add the listener for.
     * @param listener to add.
     * @param options to use when adding the listener.
     */
    addEventListener(type, listener, options) {
      this._options.listeners[type].push({ listener, options });
    }
    /**
     * Removes one or more event listener for the given event-type that match the given listener and options.
     *
     * @param type of the event to remove the listener for.
     * @param listener to remove.
     * @param options that were used when the listener was added.
     */
    removeEventListener(type, listener, options) {
      const isListenerNotToBeRemoved = (l) => l.listener !== listener || l.options !== options;
      this._options.listeners[type] = this._options.listeners[type].filter(isListenerNotToBeRemoved);
    }
    /**
     * Creates a new browser-native websocket and connects it to the given URL with the given protocols
     * and adds all event listeners to the browser-native websocket.
     *
     * @return the created browser-native websocket which is also stored in the '_underlyingWebsocket' property.
     */
    tryConnect() {
      this._url = typeof this._urlProvider === "function" ? this._urlProvider() : this._urlProvider;
      this._underlyingWebsocket = new WebSocket(this._url, this.protocols);
      this._underlyingWebsocket.addEventListener(WebsocketEvent.open, this.handleOpenEvent);
      this._underlyingWebsocket.addEventListener(WebsocketEvent.close, this.handleCloseEvent);
      this._underlyingWebsocket.addEventListener(WebsocketEvent.error, this.handleErrorEvent);
      this._underlyingWebsocket.addEventListener(WebsocketEvent.message, this.handleMessageEvent);
      return this._underlyingWebsocket;
    }
    /**
     * Removes all event listeners from the browser-native websocket and closes it.
     */
    clearWebsocket() {
      this._underlyingWebsocket.removeEventListener(WebsocketEvent.open, this.handleOpenEvent);
      this._underlyingWebsocket.removeEventListener(WebsocketEvent.close, this.handleCloseEvent);
      this._underlyingWebsocket.removeEventListener(WebsocketEvent.error, this.handleErrorEvent);
      this._underlyingWebsocket.removeEventListener(WebsocketEvent.message, this.handleMessageEvent);
      this._underlyingWebsocket.close();
    }
    /**
     * Dispatch an event to all listeners of the given event-type.
     *
     * @param type of the event to dispatch.
     * @param event to dispatch.
     */
    dispatchEvent(type, event) {
      const eventListeners = this._options.listeners[type];
      const newEventListeners = [];
      eventListeners.forEach(({ listener, options }) => {
        listener(this, event);
        if (options === void 0 || options.once === void 0 || !options.once) {
          newEventListeners.push({ listener, options });
        }
      });
      this._options.listeners[type] = newEventListeners;
    }
    /**
     * Handles the given event by dispatching it to all listeners of the given event-type.
     *
     * @param type of the event to handle.
     * @param event to handle.
     */
    handleEvent(type, event) {
      switch (type) {
        case WebsocketEvent.close:
          this.dispatchEvent(type, event);
          this.scheduleConnectionRetryIfNeeded();
          break;
        case WebsocketEvent.open:
          if (this.backoff !== void 0 && this._lastConnection !== void 0) {
            const detail = {
              retries: this.backoff.retries,
              lastConnection: new Date(this._lastConnection)
            };
            const event2 = new CustomEvent(WebsocketEvent.reconnect, {
              detail
            });
            this.dispatchEvent(WebsocketEvent.reconnect, event2);
            this.backoff.reset();
          }
          this._lastConnection = /* @__PURE__ */ new Date();
          this.dispatchEvent(type, event);
          this.sendBufferedData();
          break;
        case WebsocketEvent.retry:
          this.dispatchEvent(type, event);
          this.clearWebsocket();
          this.tryConnect();
          break;
        default:
          this.dispatchEvent(type, event);
          break;
      }
    }
    /**
     * Sends buffered data if there is a buffer defined.
     */
    sendBufferedData() {
      if (this.buffer === void 0) {
        return;
      }
      for (let ele = this.buffer.read(); ele !== void 0; ele = this.buffer.read()) {
        this.send(ele);
      }
    }
    /**
     * Schedules a connection-retry if there is a backoff defined and the websocket was not closed by the user.
     */
    scheduleConnectionRetryIfNeeded() {
      if (this.closedByUser) {
        return;
      }
      if (this.backoff === void 0) {
        return;
      }
      const handleRetryEvent = (detail) => {
        const event = new CustomEvent(WebsocketEvent.retry, { detail });
        this.handleEvent(WebsocketEvent.retry, event);
      };
      const retryEventDetail = {
        backoff: this._options.retry.instantReconnect === true ? 0 : this.backoff.next(),
        retries: this._options.retry.instantReconnect === true ? 0 : this.backoff.retries,
        lastConnection: this._lastConnection
      };
      if (this._options.retry.maxRetries === void 0 || retryEventDetail.retries <= this._options.retry.maxRetries) {
        this.retryTimeout = globalThis.setTimeout(() => handleRetryEvent(retryEventDetail), retryEventDetail.backoff);
      }
    }
    /**
     * Cancels the scheduled connection-retry, if there is one.
     */
    cancelScheduledConnectionRetry() {
      globalThis.clearTimeout(this.retryTimeout);
    }
  };

  // node_modules/websocket-ts/dist/esm/src/websocket_builder.js
  var WebsocketBuilder = class {
    /**
     * Creates a new WebsocketBuilder.
     *
     * @param url the url to connect to, or a function that returns a URL
     */
    constructor(url) {
      this._url = url;
    }
    /**
     * Getter for the url.
     *
     * @returns the url or url provider
     */
    get url() {
      return this._url;
    }
    /**
     * Adds protocols to the websocket. Subsequent calls to this method will override the previously set protocols.
     *
     * @param protocols the protocols to add
     */
    withProtocols(protocols) {
      this._protocols = protocols;
      return this;
    }
    /**
     * Getter for the protocols.
     *
     * @returns the protocols, undefined if no protocols have been set
     */
    get protocols() {
      return this._protocols;
    }
    /**
     * Sets the maximum number of retries before giving up. No limit if undefined.
     *
     * @param maxRetries the maximum number of retries before giving up
     */
    withMaxRetries(maxRetries) {
      var _a;
      this._options = Object.assign(Object.assign({}, this._options), { retry: Object.assign(Object.assign({}, (_a = this._options) === null || _a === void 0 ? void 0 : _a.retry), { maxRetries }) });
      return this;
    }
    /**
     * Getter for the maximum number of retries before giving up.
     *
     * @returns the maximum number of retries before giving up, undefined if no maximum has been set
     */
    get maxRetries() {
      var _a, _b;
      return (_b = (_a = this._options) === null || _a === void 0 ? void 0 : _a.retry) === null || _b === void 0 ? void 0 : _b.maxRetries;
    }
    /**
     * Sets whether to reconnect immediately after a connection has been lost, ignoring the backoff strategy for the first retry.
     *
     * @param instantReconnect whether to reconnect immediately after a connection has been lost
     */
    withInstantReconnect(instantReconnect) {
      var _a;
      this._options = Object.assign(Object.assign({}, this._options), { retry: Object.assign(Object.assign({}, (_a = this._options) === null || _a === void 0 ? void 0 : _a.retry), { instantReconnect }) });
      return this;
    }
    /**
     * Getter for whether to reconnect immediately after a connection has been lost, ignoring the backoff strategy for the first retry.
     *
     * @returns whether to reconnect immediately after a connection has been lost, undefined if no value has been set
     */
    get instantReconnect() {
      var _a, _b;
      return (_b = (_a = this._options) === null || _a === void 0 ? void 0 : _a.retry) === null || _b === void 0 ? void 0 : _b.instantReconnect;
    }
    /**
     * Adds a backoff to the websocket. Subsequent calls to this method will override the previously set backoff.
     *
     * @param backoff the backoff to add
     */
    withBackoff(backoff) {
      var _a;
      this._options = Object.assign(Object.assign({}, this._options), { retry: Object.assign(Object.assign({}, (_a = this._options) === null || _a === void 0 ? void 0 : _a.retry), { backoff }) });
      return this;
    }
    /**
     * Getter for the backoff.
     *
     * @returns the backoff, undefined if no backoff has been set
     */
    get backoff() {
      var _a, _b;
      return (_b = (_a = this._options) === null || _a === void 0 ? void 0 : _a.retry) === null || _b === void 0 ? void 0 : _b.backoff;
    }
    /**
     * Adds a buffer to the websocket. Subsequent calls to this method will override the previously set buffer.
     *
     * @param buffer the buffer to add
     */
    withBuffer(buffer) {
      this._options = Object.assign(Object.assign({}, this._options), { buffer });
      return this;
    }
    /**
     * Getter for the buffer.
     *
     * @returns the buffer, undefined if no buffer has been set
     */
    get buffer() {
      var _a;
      return (_a = this._options) === null || _a === void 0 ? void 0 : _a.buffer;
    }
    /**
     * Adds an 'open' event listener to the websocket. Subsequent calls to this method will add additional listeners that will be
     * called in the order they were added.
     *
     * @param listener the listener to add
     * @param options the listener options
     */
    onOpen(listener, options) {
      this.addListener(WebsocketEvent.open, listener, options);
      return this;
    }
    /**
     * Adds an 'close' event listener to the websocket. Subsequent calls to this method will add additional listeners that will be
     * called in the order they were added.
     *
     * @param listener the listener to add
     * @param options the listener options
     */
    onClose(listener, options) {
      this.addListener(WebsocketEvent.close, listener, options);
      return this;
    }
    /**
     * Adds an 'error' event listener to the websocket. Subsequent calls to this method will add additional listeners that will be
     * called in the order they were added.
     *
     * @param listener the listener to add
     * @param options the listener options
     */
    onError(listener, options) {
      this.addListener(WebsocketEvent.error, listener, options);
      return this;
    }
    /**
     * Adds an 'message' event listener to the websocket. Subsequent calls to this method will add additional listeners that will be
     * called in the order they were added.
     *
     * @param listener the listener to add
     * @param options the listener options
     */
    onMessage(listener, options) {
      this.addListener(WebsocketEvent.message, listener, options);
      return this;
    }
    /**
     * Adds an 'retry' event listener to the websocket. Subsequent calls to this method will add additional listeners that will be
     * called in the order they were added.
     *
     * @param listener the listener to add
     * @param options the listener options
     */
    onRetry(listener, options) {
      this.addListener(WebsocketEvent.retry, listener, options);
      return this;
    }
    /**
     * Adds an 'reconnect' event listener to the websocket. Subsequent calls to this method will add additional listeners that will be
     * called in the order they were added.
     *
     * @param listener the listener to add
     * @param options the listener options
     */
    onReconnect(listener, options) {
      this.addListener(WebsocketEvent.reconnect, listener, options);
      return this;
    }
    /**
     * Builds the websocket.
     *
     * @return a new websocket, with the set options
     */
    build() {
      return new Websocket(this._url, this._protocols, this._options);
    }
    /**
     * Adds an event listener to the options.
     *
     * @param event the event to add the listener to
     * @param listener the listener to add
     * @param options the listener options
     */
    addListener(event, listener, options) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
      this._options = Object.assign(Object.assign({}, this._options), { listeners: {
        open: (_c = (_b = (_a = this._options) === null || _a === void 0 ? void 0 : _a.listeners) === null || _b === void 0 ? void 0 : _b.open) !== null && _c !== void 0 ? _c : [],
        close: (_f = (_e = (_d = this._options) === null || _d === void 0 ? void 0 : _d.listeners) === null || _e === void 0 ? void 0 : _e.close) !== null && _f !== void 0 ? _f : [],
        error: (_j = (_h = (_g = this._options) === null || _g === void 0 ? void 0 : _g.listeners) === null || _h === void 0 ? void 0 : _h.error) !== null && _j !== void 0 ? _j : [],
        message: (_m = (_l = (_k = this._options) === null || _k === void 0 ? void 0 : _k.listeners) === null || _l === void 0 ? void 0 : _l.message) !== null && _m !== void 0 ? _m : [],
        retry: (_q = (_p = (_o = this._options) === null || _o === void 0 ? void 0 : _o.listeners) === null || _p === void 0 ? void 0 : _p.retry) !== null && _q !== void 0 ? _q : [],
        reconnect: (_t = (_s = (_r = this._options) === null || _r === void 0 ? void 0 : _r.listeners) === null || _s === void 0 ? void 0 : _s.reconnect) !== null && _t !== void 0 ? _t : [],
        [event]: [
          ...(_w = (_v = (_u = this._options) === null || _u === void 0 ? void 0 : _u.listeners) === null || _v === void 0 ? void 0 : _v[event]) !== null && _w !== void 0 ? _w : [],
          { listener, options }
        ]
      } });
      return this;
    }
  };

  // constants.ts
  var API_URL = "http://localhost:8080/api/get_applications";
  var WS_URL = "http://localhost:8080/api/admin_page_ws";

  // websocket_manager.ts
  var WebsocketManager = class {
    constructor() {
      this.addListeners = () => {
        this.ws.addEventListener(WebsocketEvent.open, (i) => console.log("opened!"));
        this.ws.addEventListener(WebsocketEvent.close, () => console.log("closed!"));
        this.ws.addEventListener(WebsocketEvent.message, (i, ev) => this.echoOnMessage(i, ev));
      };
      this.echoOnMessage = (i, ev) => {
        console.log(`received message: ${ev.data}`);
        try {
          const result = JSON.parse(ev.data);
          const applications = [];
          result.forEach((value) => {
            applications.push(Object.assign(new Application(), value));
          });
        } catch (_) {
        }
        i.send(`echo: ${ev.data}`);
      };
      this.ws = new WebsocketBuilder(WS_URL).withBackoff(new ConstantBackoff(100)).build();
      this.addListeners();
    }
  };

  // admin_page.ts
  async function getApplications(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      const applications = [];
      result.forEach((value) => {
        applications.push(Object.assign(new Application(), value));
      });
      return applications;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  var calendar = new CalendarUI();
  var table = new TableUI();
  var ws_manager = new WebsocketManager();
  getApplications(API_URL).then((applications) => {
    table.setApplications(applications);
    for (const application of applications) {
      table.addRow(application);
      calendar.addNoteToDate("\u042D\u043A\u0443\u0441\u043A\u0443\u0440\u0441\u0438\u044F", application.date, application);
    }
  });
  table.create();
  calendar.create();
})();
