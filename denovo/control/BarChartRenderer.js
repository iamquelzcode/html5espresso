sap.ui.define(['jquery.sap.global'],
    function(jQuery) {
        "use strict";
    
        var BarChartRenderer = {
        };


        /**
         * Renders the HTML for the given control, using the provided {@link openui5.simplecharts.SimpleBarChart}.
         *
         * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the Render-Output-Buffer
         * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
         */
        BarChartRenderer.render = function (oRm, oControl) {
            oRm.write("<div ");
            oRm.writeControlData(oControl);
            oRm.write(">");
            oRm.write("</div>");

        };


        return BarChartRenderer;

    }, /* bExport= */ true);