"use strict";

(() => {

    let current_computation = null;

    function Computation(func) {
        this.run = () => func();
    }

    function RVar(value) {
        let dependent_computations = [];

        this.get = () => {
            if (current_computation !== null) {
                dependent_computations.push(current_computation);
            }
            return value;
        };

        this.set = (newval) => {
            if (newval !== value) {
                value = newval;
                // run dependent computations...
                for (const computation of dependent_computations) {
                    computation.run();
                }
            }
        };
    }

    function autorun(func) {
        // RVars will track the current computation when it is not null.
        current_computation = new Computation(func);
        func();
        current_computation = null;
    }

    if (typeof window !== "undefined") {
        RVar.autorun = autorun;
        window.RVar = RVar;
    }
    if (typeof module !== "undefined") {
        module.exports = RVar;
    }

})();
