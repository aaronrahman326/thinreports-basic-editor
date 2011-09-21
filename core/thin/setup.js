//  Copyright (C) 2010 Matsukei Co.,Ltd.
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

goog.provide('thin.setup');

goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Textarea');

goog.require('thin.Settings');
goog.require('thin.core');
goog.require('thin.core.platform');
goog.require('thin.core.Font');
goog.require('thin.base');
goog.require('thin.Error');
goog.require('thin.Compatibility');
goog.require('thin.ui');
goog.require('thin.ui.MainLayout');
goog.require('thin.ui.Dialog');
goog.require('thin.ui.Dialog.ButtonSet');
goog.require('thin.ui.Toolbar');
goog.require('thin.ui.ToolbarButton');
goog.require('thin.ui.ToolbarSeparator');
goog.require('thin.ui.ToolbarIconButton');
goog.require('thin.ui.ToolbarMenuButton');
goog.require('thin.ui.ToolbarSplitButton');
goog.require('thin.ui.ToolbarSplitToggleButton');
goog.require('thin.ui.ToolbarToggleIconButton');
goog.require('thin.ui.ToolbarSelect');
goog.require('thin.ui.ToolbarFontSelect');
goog.require('thin.ui.ToggleGroup');
goog.require('thin.ui.MenuItem');
goog.require('thin.ui.MenuSeparator');
goog.require('thin.ui.Message.confirm');
goog.require('thin.ui.SplitButton');
goog.require('thin.ui.SplitButton.Orientation');
goog.require('thin.ui.ToolboxView');
goog.require('thin.ui.ToolboxButton');
goog.require('thin.ui.ToolboxSeparator');
goog.require('thin.ui.Icon');
goog.require('thin.ui.TabPane');
goog.require('thin.ui.TabPane.TabPage');
goog.require('thin.ui.PropertyView');
goog.require('thin.ui.PropertyPane');
goog.require('thin.ui.PropertyPane.SelectProperty');
goog.require('thin.ui.PropertyPane.ComboBoxProperty');
goog.require('thin.ui.PropertyPane.CheckboxProperty');
goog.require('thin.ui.PropertyPane.InputProperty');
goog.require('thin.ui.PropertyPane.ColorProperty');
goog.require('thin.ui.Select');
goog.require('thin.ui.Option');
goog.require('thin.ui.Checkbox');
goog.require('thin.ui.ComboBox');
goog.require('thin.ui.ComboBoxItem');

goog.require('thin.editor');
goog.require('thin.editor.Component');
goog.require('thin.editor.Workspace');
goog.require('thin.editor.toolaction.SelectAction');
goog.require('thin.editor.toolaction.ZoomAction');
goog.require('thin.editor.toolaction.RectAction');
goog.require('thin.editor.toolaction.EllipseAction');
goog.require('thin.editor.toolaction.LineAction');
goog.require('thin.editor.toolaction.TextAction');
goog.require('thin.editor.toolaction.TblockAction');
goog.require('thin.editor.toolaction.ListAction');
goog.require('thin.editor.toolaction.ImageAction');
goog.require('thin.editor.toolaction.ImageblockAction');
goog.require('thin.editor.LayoutUtil');
goog.require('thin.editor.ListHelper');
goog.require('thin.editor.ListHelper.ColumnName');
goog.require('thin.editor.TextStyle');
goog.require('thin.editor.TextStyle.HorizonAlignType');
goog.require('thin.editor.TextStyle.VerticalAlignType');
goog.require('thin.editor.HistoryManager');
goog.require('thin.editor.HistoryManager.Mode');
goog.require('thin.layout');
goog.require('thin.layout.Format');
goog.require('thin.layout.FormatPage');
goog.require('thin.layout.FormatPage.DEFAULT_SETTINGS');
goog.require('thin.layout.FormatPage.PaperType');
goog.require('thin.layout.FormatPage.DirectionType');
goog.require('thin.layout.File');


thin.setup = function() {

  /**
   * @param {e} goog.events.Event
   */
  var focusWorkspace = function(e) {
    var workspace = thin.editor.getActiveWorkspace();
    if (workspace) {
      workspace.focusElement(e);
    }
  };
  
  var initUiStatus = function() {
    var toolbar = thin.ui.getComponent('toolbar');
    var toolFamily_ = toolbar.getChild('font-family');
    var toolSize_ = toolbar.getChild('font-size');
    var toolBold_ = toolbar.getChild('font-bold');
    var toolItalic_ = toolbar.getChild('font-italic');
    var toolUnder_ = toolbar.getChild('font-underline');
    var toolStrike_ = toolbar.getChild('font-strike');
    var toolTextEdit_ = toolbar.getChild('text-edit');
    var halignLeft_ = toolbar.getChild('text-align-left');
    var halignCenter_ = toolbar.getChild('text-align-center');
    var halignRight_ = toolbar.getChild('text-align-right');
    var valignTop_ = toolbar.getChild('text-valign-top');
    var valignMiddle_ = toolbar.getChild('text-valign-center');
    var valignBottom_ = toolbar.getChild('text-valign-bottom');
    
    thin.ui.getComponent('toolbox').setSelectedItem(null);
    toolbar.getChild('guide').setChecked(false);
    
    toolbar.getChild('redo').setEnabled(false);
    toolbar.getChild('zoom-rate').setInternalValue('100');
    toolFamily_.setValue(null);
    toolSize_.setInternalValue('18');
    
    toolBold_.setEnabled(false);
    toolItalic_.setEnabled(false);
    toolUnder_.setEnabled(false);
    toolStrike_.setEnabled(false);
    toolFamily_.setEnabled(false);
    toolSize_.setEnabled(false);
    toolTextEdit_.setEnabled(false);
    halignLeft_.setEnabled(false);
    halignCenter_.setEnabled(false);
    halignRight_.setEnabled(false);
    valignTop_.setEnabled(false);
    valignMiddle_.setEnabled(false);
    valignBottom_.setEnabled(false);
    
    toolBold_.setChecked(false);
    toolItalic_.setChecked(false);
    toolUnder_.setChecked(false);
    toolStrike_.setChecked(false);
    halignLeft_.setChecked(false);
    halignCenter_.setChecked(false);
    halignRight_.setChecked(false);
    valignTop_.setChecked(false);
    valignMiddle_.setChecked(false);
    valignBottom_.setChecked(false);
    
    var proppane_ = thin.ui.getComponent('proppane');
    proppane_.clear();
  };

  var main = new thin.ui.MainLayout();
  main.decorate(goog.dom.getElement('thin-main'));
    
  var tabpane = new thin.ui.TabPane();
  main.addChildToMain(tabpane);
  thin.ui.registerComponent('tabpane', tabpane);
  
  var componentEventType = goog.ui.Component.EventType;

  (function() {
    var tabPaneEventType = thin.ui.TabPane.EventType;

    tabpane.addEventListener(tabPaneEventType.CHANGE_PAGE, function(e) {
      var beforePage = e.beforePage;
      if (beforePage) {
        (function() {
          var layout = beforePage.getContent().getLayout();
          var helpers = layout.getHelpers();
          var activeShapeManager = layout.getManager().getActiveShape();
          var listHelper = helpers.getListHelper();
          var multipleShapesHelper = helpers.getMultipleShapesHelper();

          if (!activeShapeManager.isEmpty()) {
            if (listHelper.isActived()) {
              if (activeShapeManager.isMultiple()) {
                multipleShapesHelper.captureProperties();
              }
            } else {
              var activeShapeManagerByListShape = listHelper.getActiveShape();
              if (activeShapeManagerByListShape.isMultiple()) {
                multipleShapesHelper.captureProperties();
              }
            }
          }
        })();
      }
      
      var selectedPage = e.page;
      var selectedWorkspace = selectedPage.getContent();
      var selectedAction = selectedWorkspace.getUiStatusForAction();
      var toolbox = thin.ui.getComponent('toolbox');
      var toolbar = thin.ui.getComponent('toolbar');
      var layout = selectedWorkspace.getLayout();
      
      initUiStatus();
      toolbox.setSelectedItem(toolbox.getChild(selectedAction));
      toolbar.getChild('guide').setChecked(layout.getHelpers().getLayoutGuideHelper().isEnable());
      thin.ui.setEnabledForFontBaseUi(
            selectedWorkspace.getUiStatusForFontBaseUi());
      thin.ui.setEnabledForTextStyleUi(
            selectedWorkspace.getUiStatusForTextStyleUi());
      thin.ui.setEnabledForHorizontalAlignTypeUi(
            selectedWorkspace.getUiStatusForHorizontalAlignTypeUi());
      thin.ui.setEnabledForVerticalAlignTypeUi(
            selectedWorkspace.getUiStatusForVerticalAlignTypeUi());
      thin.ui.setEnabledForTextEdit(
            selectedWorkspace.getUiStatusForTextEditUi());

      thin.ui.adjustToUiStatusForWorkspace();
      thin.ui.setInputValueForZoomRate(selectedWorkspace.getUiStatusForZoom());
      thin.ui.adjustUiStatusToRedo(selectedWorkspace.getHistory().isLatest());
      
      (function() {
        var helpers = layout.getHelpers();
        var activeShapeManager = layout.getManager().getActiveShape();
        
        if (activeShapeManager.isEmpty()) {
          thin.ui.getComponent('proppane').updateAsync(function() {
            layout.updatePropertiesForEmpty();
          });
        } else {
          var listHelper = helpers.getListHelper();
          var singleShape = activeShapeManager.getIfSingle();
          
          if (listHelper.isActived()) {
            if (singleShape) {
              singleShape.updateProperties();
            } else {
              helpers.getMultipleShapesHelper().updateProperties();
            }
          } else {
            var activeShapeManagerByListShape = listHelper.getActiveShape();
            if (activeShapeManagerByListShape.isEmpty()) {
              singleShape.updateProperties();
            } else if (activeShapeManagerByListShape.isSingle()) {
              activeShapeManagerByListShape.getIfSingle().updateProperties();
            } else {
              helpers.getMultipleShapesHelper().updateProperties();
            }
          }
        }
      })();
    });

    tabpane.addEventListener(tabPaneEventType.CLOSE_PAGE, function(e) {
      var removePage = e.page;
      var removeWorkspace = removePage.getContent();
      
      if(removeWorkspace.isChanged()) {
        var confirmDialogFromTab = new thin.ui.Message.confirm(
          '内容が変更されています。<br/>保存しますか ？', '確認',
          function(e) {

            if (e.isYes()) {
              confirmDialogFromTab.setVisible(false);
              if(!removeWorkspace.save()) {
                focusWorkspace(e);
                return;
              }
            }
            
            if (!e.isCancel()) {
              tabpane.destroyPage(removePage);
              if(tabpane.getPageCount() == 0) {
                initUiStatus();
              }
            }
            focusWorkspace(e);
          }, thin.ui.Dialog.ButtonSet.typeYesNoCancel());
        return false;
      } else {
        if(tabpane.getPageCount() == 1) {
          initUiStatus();
        }
        return true;
      }
    });
  })();

  (function() {
    
    var toolbar = new thin.ui.Toolbar();

    var iconAlign = thin.ui.Icon.Align;
    var dom = toolbar.getDomHelper();

    // Add report
    var reportAdd = toolbar.setupChild('report-add', 
        new thin.ui.ToolbarButton('新規作成', new thin.ui.Icon('report-add', iconAlign.TOP)), 
        dom.getElement('tbar-report-add'));
    
    reportAdd.addEventListener(componentEventType.ACTION, function(e) {
      // Create dialog.
      var dialog = new thin.ui.Dialog();
      dialog.setDisposeOnHide(true);
      dialog.setTitle('新しいレイアウト');
      dialog.setWidth(400);
      dialog.setButtonSet(thin.ui.Dialog.ButtonSet.typeOkCancel());
      
      var pageTitleInput = new thin.ui.Input('page title');
      dialog.addChild(pageTitleInput, false);
      pageTitleInput.render(goog.dom.getElement('new-config-page-title'));
      
      var paperTypeSelectbox = new thin.ui.Select();
      dialog.addChild(paperTypeSelectbox, false);

      paperTypeSelectbox.setTextAlignLeft();
      goog.array.forEach(goog.object.getValues(thin.layout.FormatPage.PaperType), function(typeName) {
        paperTypeSelectbox.addItem(new thin.ui.Option(typeName));
      });
      paperTypeSelectbox.setWidth(152);
      paperTypeSelectbox.render(goog.dom.getElement('new-config-paper-type'));
      paperTypeSelectbox.addEventListener(componentEventType.ACTION, function(e) {
        var enabled = thin.layout.FormatPage.isUserType(paperTypeSelectbox.getValue());
        pageWidthInput.setEnabled(enabled);
        pageHeightInput.setEnabled(enabled);
      });
      
      var pageWidthInput = new thin.ui.Input();
      dialog.addChild(pageWidthInput, false);
      
      var pageWidthInputValidation = new thin.ui.Input.NumberValidator();
      pageWidthInputValidation.setInputRange(1);
      pageWidthInput.setValidator(pageWidthInputValidation);
      pageWidthInput.render(goog.dom.getElement('new-config-page-width'));
      
      var pageHeightInput = new thin.ui.Input();
      dialog.addChild(pageHeightInput, false);
      
      var pageHeightInputValidation = new thin.ui.Input.NumberValidator();
      pageHeightInputValidation.setInputRange(1);
      pageHeightInput.setValidator(pageHeightInputValidation);
      pageHeightInput.render(goog.dom.getElement('new-config-page-height'));
      
      var pageDirectionPr = goog.dom.getElement('new-config-page-direction-pr');
      dialog.setControl('page-direction-pr', pageDirectionPr);
      
      var pageDirectionLs = goog.dom.getElement('new-config-page-direction-ls');
      dialog.setControl('page-direction-ls', pageDirectionLs);
      
      var pageMarginTop = new thin.ui.Input('page margin top');
      dialog.addChild(pageMarginTop, false);
      
      pageMarginTop.setValidator(new thin.ui.Input.NumberValidator());
      pageMarginTop.render(goog.dom.getElement('new-config-page-margin-top'));
      
      var pageMarginBottom = new thin.ui.Input('page margin bottom');
      dialog.addChild(pageMarginBottom, false);
      
      pageMarginBottom.setValidator(new thin.ui.Input.NumberValidator());
      pageMarginBottom.render(goog.dom.getElement('new-config-page-margin-bottom'));
      
      var pageMarginLeft = new thin.ui.Input('page margin left');
      dialog.addChild(pageMarginLeft, false);
      
      pageMarginLeft.setValidator(new thin.ui.Input.NumberValidator());
      pageMarginLeft.render(goog.dom.getElement('new-config-page-margin-left'));
      
      var pageMarginRight = new thin.ui.Input('page margin right');
      dialog.addChild(pageMarginRight, false);
      
      pageMarginRight.setValidator(new thin.ui.Input.NumberValidator());
      pageMarginRight.render(goog.dom.getElement('new-config-page-margin-right'));
      
      dialog.decorate(goog.dom.getElement('new-dialog-report-config'));

      dialog.addEventListener(goog.ui.Dialog.EventType.SELECT, function(e) {
        if (e.isOk()) {
          var paperTypeValue = paperTypeSelectbox.getValue();
          var formatConfig = {
            'paper-type': paperTypeValue,
            'orientation': pageDirectionPr.checked ? pageDirectionPr.value : pageDirectionLs.value,
            'margin-top': pageMarginTop.getValue() || 0,
            'margin-bottom': pageMarginBottom.getValue() || 0,
            'margin-left': pageMarginLeft.getValue() || 0,
            'margin-right': pageMarginRight.getValue() || 0
          };
          if (thin.layout.FormatPage.isUserType(paperTypeValue)) {
            var userWidth = pageWidthInput.getValue();
            var userHeight = pageHeightInput.getValue();
            
            if (goog.string.isEmpty(userWidth) ||
                goog.string.isEmpty(userHeight)) {
              thin.ui.Message.alert('用紙設定が未入力です。', 'Error', function() {
                dialog.focus();
              });
              return false;
            }
            formatConfig['width'] = Number(userWidth);
            formatConfig['height'] = Number(userHeight);
          }
          var format = new thin.layout.Format();
          format.page = format.setPage({
            'title': pageTitleInput.getValue(),
            'page': formatConfig
          });
          var workspace = new thin.editor.Workspace(format);
          tabpane.addPage(new thin.ui.TabPane.TabPage('NoName', workspace));
          workspace.setup();
        }
        return true;
      });
      
      dialog.addEventListener(goog.ui.Dialog.EventType.AFTER_HIDE, focusWorkspace);
      
      // Initialize dialog.
      pageTitleInput.setValue('');
      paperTypeSelectbox.setValue(thin.layout.FormatPage.DEFAULT_SETTINGS['paper-type']);
      pageDirectionPr.checked = true;
      
      pageWidthInput.setEnabled(false);
      pageWidthInput.setValue('');
      
      pageHeightInput.setEnabled(false);
      pageHeightInput.setValue('');
      
      pageMarginTop.setValue(thin.layout.FormatPage.DEFAULT_SETTINGS['margin-top']);
      pageMarginBottom.setValue(thin.layout.FormatPage.DEFAULT_SETTINGS['margin-bottom']);
      pageMarginLeft.setValue(thin.layout.FormatPage.DEFAULT_SETTINGS['margin-left']);
      pageMarginRight.setValue(thin.layout.FormatPage.DEFAULT_SETTINGS['margin-right']);
      
      dialog.setVisible(true);
    });
    
    // Save report
    var toolSave = toolbar.setupChild('report-save', 
        new thin.ui.ToolbarButton('保存', new thin.ui.Icon('report-save', iconAlign.TOP)), 
        dom.getElement('tbar-report-save'));

    toolSave.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.save();
        focusWorkspace(e);
      }
    });
    
    // Open report file
    var toolOpen = toolbar.setupChild('report-open', 
        new thin.ui.ToolbarButton('開く', new thin.ui.Icon('report-open')), 
        dom.getElement('tbar-report-open'));

    toolOpen.addEventListener(componentEventType.ACTION, function(e) {
      
      var file = thin.layout.File.openDialog();
      if (goog.isDefAndNotNull(file)) {
        var path = file.getPath();
        var tabpane = thin.ui.getComponent('tabpane');
        var tabpageCount = tabpane.getPageCount();
        
        var page;
        var captureFile;
        for (var c = 0; c < tabpageCount; c++) {
          page = tabpane.getPage(c);
          captureFile = page.getContent().getFile();
          if (!captureFile.isNew() && path == captureFile.getPath()) {
            tabpane.setSelectedPage(page);
            // Skip Open report file
            file.dispose();
            delete file;
            focusWorkspace(e);
            return;
          }
        }
        
        var workspace = thin.editor.Workspace.create(file);
        if (workspace) {
          try {
            var targetVersion = workspace.getLayout().getFormat().getVersion();
            
            if (!thin.Compatibility.check(thin.getVersion(), '=', targetVersion)) {
              throw new thin.Error(goog.string.buildString(
                      "このレイアウトは ", thin.getVersion(), "で作成されていないため開くことができません。"));
            }

            var newPage = new thin.ui.TabPane.TabPage(
                thin.core.platform.File.getPathBaseName(path), workspace);
            
            newPage.setTooltip(path); 
            tabpane.addPage(newPage);
            
            focusWorkspace(e);
          } catch (er) {
            var message;
            if (er instanceof thin.Error) {
              message = er.message;
            } else {
              message = "予期しないエラーが発生しました。";
            }
            
            thin.ui.Message.alert(message, 'Error',
                function(er) {
                  var activeWorkspace = thin.editor.getActiveWorkspace();
                  if (activeWorkspace) {
                    activeWorkspace.focusElement(er);
                  }
                });
          }
        }
      } else {
        focusWorkspace(e);
      }
    });
    // SaveAs report
    var toolSaveAs = toolbar.setupChild('report-saveas', 
        new thin.ui.ToolbarButton('名前を付けて保存', new thin.ui.Icon('report-saveas')), 
        dom.getElement('tbar-report-saveas'));

    toolSaveAs.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.saveAs();
        focusWorkspace(e);
      }
    });

    // Undo
    var toolUndo = toolbar.setupChild('undo', 
        new thin.ui.ToolbarButton('元に戻す', new thin.ui.Icon('undo')), 
        dom.getElement('tbar-undo'));

    toolUndo.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.undo();
        focusWorkspace(e);
      }
    });
    // Redo
    var toolRedo = toolbar.setupChild('redo', 
        new thin.ui.ToolbarButton('やり直す', new thin.ui.Icon('redo')), 
        dom.getElement('tbar-redo'));

    toolRedo.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.redo();
        focusWorkspace(e);
      }
    });

    var toolConfig = toolbar.setupChild('report-config', 
        new thin.ui.ToolbarButton('ページ設定', 
            new thin.ui.Icon('report-config', iconAlign.TOP)), 
        dom.getElement('tbar-report-config'));

    toolConfig.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();

      if (workspace) {
        // Create dialog.
        var dialog = new thin.ui.Dialog();
        dialog.setDisposeOnHide(true);
        dialog.setTitle('ページ印刷設定');
        dialog.setWidth(400);
        dialog.setButtonSet(thin.ui.Dialog.ButtonSet.typeOkCancel());
        
        var pageTitleInput = new thin.ui.Input('page title');
        dialog.addChild(pageTitleInput, false);
        pageTitleInput.render(goog.dom.getElement('edit-config-page-title'));
        
        var paperTypeSelectbox = new thin.ui.Select();
        dialog.addChild(paperTypeSelectbox, false);
        paperTypeSelectbox.setTextAlignLeft();
        goog.array.forEach(goog.object.getValues(thin.layout.FormatPage.PaperType), function(typeName) {
          paperTypeSelectbox.addItem(new thin.ui.Option(typeName));
        });
        paperTypeSelectbox.setWidth(152);
        paperTypeSelectbox.render(goog.dom.getElement('edit-config-paper-type'));
        paperTypeSelectbox.addEventListener(componentEventType.ACTION, function(e) {
          var enabled = thin.layout.FormatPage.isUserType(paperTypeSelectbox.getValue());
          pageWidthInput.setEnabled(enabled);
          pageHeightInput.setEnabled(enabled);
        });
        
        var pageWidthInput = new thin.ui.Input();
        dialog.addChild(pageWidthInput, false);
        var pageWidthInputValidation = new thin.ui.Input.NumberValidator();
        pageWidthInputValidation.setInputRange(1);
        pageWidthInput.setValidator(pageWidthInputValidation);
        pageWidthInput.render(goog.dom.getElement('edit-config-page-width'));
        
        var pageHeightInput = new thin.ui.Input();
        dialog.addChild(pageHeightInput, false);
        var pageHeightInputValidation = new thin.ui.Input.NumberValidator();
        pageHeightInputValidation.setInputRange(1);
        pageHeightInput.setValidator(pageHeightInputValidation);
        pageHeightInput.render(goog.dom.getElement('edit-config-page-height'));
        
        var pageDirectionPr = goog.dom.getElement('edit-config-page-direction-pr');
        dialog.setControl('page-direction-pr', pageDirectionPr);
        var pageDirectionLs = goog.dom.getElement('edit-config-page-direction-ls');
        dialog.setControl('page-direction-ls', pageDirectionLs);
        
        var pageMarginTop = new thin.ui.Input('page margin top');
        dialog.addChild(pageMarginTop, false);
        pageMarginTop.setValidator(new thin.ui.Input.NumberValidator());
        pageMarginTop.render(goog.dom.getElement('edit-config-page-margin-top'));
        
        var pageMarginBottom = new thin.ui.Input('page margin bottom');
        dialog.addChild(pageMarginBottom, false);
        pageMarginBottom.setValidator(new thin.ui.Input.NumberValidator());
        pageMarginBottom.render(goog.dom.getElement('edit-config-page-margin-bottom'));
        
        var pageMarginLeft = new thin.ui.Input('page margin left');
        dialog.addChild(pageMarginLeft, false);
        pageMarginLeft.setValidator(new thin.ui.Input.NumberValidator());
        pageMarginLeft.render(goog.dom.getElement('edit-config-page-margin-left'));
        
        var pageMarginRight = new thin.ui.Input('page margin right');
        dialog.addChild(pageMarginRight, false);
        pageMarginRight.setValidator(new thin.ui.Input.NumberValidator());
        pageMarginRight.render(goog.dom.getElement('edit-config-page-margin-right'));
        
        dialog.decorate(goog.dom.getElement('edit-dialog-report-config'));
        
        dialog.addEventListener(goog.ui.Dialog.EventType.SELECT, function(e) {
          if (e.isOk()) {
            var paperTypeValue = paperTypeSelectbox.getValue();
            var opt_width, opt_height;
            
            if (thin.layout.FormatPage.isUserType(paperTypeValue)) {
              var userWidth = pageWidthInput.getValue();
              var userHeight = pageHeightInput.getValue();
              
              if (goog.string.isEmpty(userWidth) ||
                  goog.string.isEmpty(userHeight)) {              
                new thin.ui.Message.alert('用紙設定が未入力です。', 'Error', function() {
                  dialog.focus();
                });
                return false;
              }
              opt_width = Number(userWidth);
              opt_height = Number(userHeight);
            }
            
            var margins = new goog.math.Box(pageMarginTop.getValue(),
                                pageMarginRight.getValue(),
                                pageMarginBottom.getValue(), 
                                pageMarginLeft.getValue());
            var directionTypeValue = pageDirectionPr.checked ? 
                    pageDirectionPr.value : pageDirectionLs.value;
            
            thin.editor.getActiveWorkspace().updateFormatPage(margins, paperTypeValue,
                directionTypeValue, pageTitleInput.getValue(), opt_width, opt_height);
          }
          return true;
        });
        
        dialog.addEventListener(goog.ui.Dialog.EventType.AFTER_HIDE, focusWorkspace);
        
        // Initialize dialog.
        var currentFormatPage = workspace.getLayout().getFormatPage();  
        var paperTypeValue = currentFormatPage.getPaperType();

        pageTitleInput.setValue(currentFormatPage.getTitle());
        paperTypeSelectbox.setValue(paperTypeValue);
        pageDirectionPr.value == currentFormatPage.getOrientation() ? 
          pageDirectionPr.checked = true : pageDirectionLs.checked = true;
        
        var isUserType = currentFormatPage.isUserType();
        
        if (isUserType) {
          pageWidthInput.setValue(currentFormatPage.getWidth());
          pageHeightInput.setValue(currentFormatPage.getHeight());
        } else {
          pageWidthInput.setValue('');
          pageHeightInput.setValue('');
        }
        pageWidthInput.setEnabled(isUserType);
        pageHeightInput.setEnabled(isUserType);
        pageMarginTop.setValue(currentFormatPage.getMarginTop());
        pageMarginBottom.setValue(currentFormatPage.getMarginBottom());
        pageMarginLeft.setValue(currentFormatPage.getMarginLeft());
        pageMarginRight.setValue(currentFormatPage.getMarginRight());

        dialog.setVisible(true);
      }
    });

    // Zoom in
    var toolZoomIn = toolbar.setupChild('zoom-in', 
        new thin.ui.ToolbarButton('拡大', new thin.ui.Icon('zoom-in')), 
        dom.getElement('tbar-zoom-in'));

    toolZoomIn.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetZoom(workspace.getUiStatusForZoom() + 10);
        focusWorkspace(e);
      }
    });
    
    // Zoom out
    var toolZoomOut = toolbar.setupChild('zoom-out', 
        new thin.ui.ToolbarButton('縮小', new thin.ui.Icon('zoom-out')), 
        dom.getElement('tbar-zoom-out'));

    toolZoomOut.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetZoom(workspace.getUiStatusForZoom() - 10);
        focusWorkspace(e);
      }
    });
    // Zoom rate
    var toolZoomRate = toolbar.setupChild('zoom-rate', 
        new thin.ui.ComboBox(), dom.getElement('tbar-zoom-rate'), 
        function(combobox) {
          var zoomRateList = ['25', '50', '75', '100', '150', '200'];
          var comboboxItem;
          goog.array.forEach(zoomRateList, function(zoomRate) {
            comboboxItem = new thin.ui.ComboBoxItem(zoomRate);
            comboboxItem.setSticky(true);
            combobox.addItem(comboboxItem);
          });
          combobox.setInternalValue('100');
          combobox.setWidth(50);
          combobox.getInput().setValidator(new thin.ui.Input.NumberValidator());
        });

    toolZoomRate.addEventListener(componentEventType.CHANGE, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetZoom(Number(toolZoomRate.getValue()));
        focusWorkspace(e);
      }
    });
    
    // Guide
    var toolGuide = toolbar.setupChild('guide', 
        new thin.ui.ToolbarSplitToggleButton('ガイド', 
            new thin.ui.Icon('guide'), thin.ui.SplitButton.Orientation.VERTICAL), 
        dom.getElement('tbar-guide'));
    
    toolGuide.getButton().addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionShowLayoutGuide(e.target.isChecked());
        focusWorkspace(e);
      }
    });
    
    var toolGuideAddHorizontal = new thin.ui.MenuItem('ガイドラインの追加（水平）', new thin.ui.Icon('guide-add'));
    toolGuide.addItem(toolGuideAddHorizontal);
    toolGuideAddHorizontal.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAddHorizonLayoutGuide();
        focusWorkspace(e);
      }
    });
    
    var toolGuideAddVertical = new thin.ui.MenuItem('ガイドラインの追加（垂直）', new thin.ui.Icon('guide-add'));
    toolGuide.addItem(toolGuideAddVertical);
    toolGuideAddVertical.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAddVerticalLayoutGuide();
        focusWorkspace(e);
      }
    });
    
    // Separator    
    toolGuide.addItem(new thin.ui.MenuSeparator());
    
    var toolGuideRemove = new thin.ui.MenuItem('ガイドラインの削除', new thin.ui.Icon('guide-delete'));
    toolGuide.addItem(toolGuideRemove);
    toolGuideRemove.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionRemoveLayoutGuide();
        focusWorkspace(e);
      }
    });
        
    // Font family
    var toolFamily = toolbar.setupChild('font-family', 
        new thin.ui.ToolbarFontSelect(),
        dom.getElement('tbar-font-family'), 
        function(selectbox) {
          selectbox.setWidth(170);
        });
    
    toolFamily.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        var selectedFamily = toolFamily.getValue();
        if (!goog.string.isEmpty(selectedFamily)) {
          workspace.getAction().actionSetFontFamily(selectedFamily);
          focusWorkspace(e);
        }
      }
    });
    
    // Font size
    var toolSize = toolbar.setupChild('font-size', 
        new thin.ui.ComboBox(), dom.getElement('tbar-font-size'), 
        function(combobox) {
          var comboboxItem;
          goog.array.forEach(thin.editor.FontStyle.FONTSIZE_LIST, function(fontSize) {
            comboboxItem = new thin.ui.ComboBoxItem(fontSize);
            comboboxItem.setSticky(true);
            combobox.addItem(comboboxItem);
          });
          combobox.setWidth(50);
          combobox.setInternalValue('18');
          
          var fontSizeInputValidation = new thin.ui.Input.NumberValidator(this);
          fontSizeInputValidation.setInputRange(5);
          fontSizeInputValidation.setAllowDecimal(true, 1);
          
          combobox.getInput().setValidator(fontSizeInputValidation);
        });

    toolSize.addEventListener(componentEventType.CHANGE, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if(workspace) {
        var selectedSize = Number(toolSize.getValue());
        if(goog.isNumber(selectedSize) && selectedSize > 0) {
          workspace.getAction().actionSetFontSize(selectedSize);
          focusWorkspace(e);
        }
      }
    });

    // Font and Text styles
    var styleElement = dom.getElement('tbar-font-styles');
    
    // Bold
    var toolBold = toolbar.setupChild('font-bold', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('font-bold')), 
        styleElement);

    toolBold.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetFontBold(toolBold.isChecked());
        focusWorkspace(e);
      }
    });
    
    // Italic
    var toolItalic = toolbar.setupChild('font-italic', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('font-italic')), 
        styleElement);
        
    toolItalic.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetFontItalic(toolItalic.isChecked());
        focusWorkspace(e);
      }
    });
    
    // Underline
    var toolUnderline = toolbar.setupChild('font-underline', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('font-underline')), 
        styleElement);

    toolUnderline.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetFontUnderline(toolUnderline.isChecked());
        focusWorkspace(e);
      }
    });
    
    // Strike
    var toolStrike = toolbar.setupChild('font-strike', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('font-strike')), 
        styleElement);

    toolStrike.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetFontLinethrough(toolStrike.isChecked());
        focusWorkspace(e);
      }
    });
    
    // Separator
    new thin.ui.ToolbarSeparator().render(styleElement);
    
    // Text Edit
    var toolTextEdit = toolbar.setupChild('text-edit', 
        new thin.ui.ToolbarButton('テキスト編集', new thin.ui.Icon('text-edit')), 
        styleElement);

    toolTextEdit.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionTextEdit();
      }
    });
    
    // Text Horizon Alignments
    var horizonElement = dom.getElement('tbar-horizon-text-align');
    var halignGroup = new thin.ui.ToggleGroup();
    
    // Horizon align left
    var halignLeft = toolbar.setupChild('text-align-left', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('text-align-left')), 
        horizonElement);

    halignGroup.addMember(/** @type {thin.ui.ToolbarToggleIconButton} */ (halignLeft));
    halignLeft.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetTextAnchor(thin.editor.TextStyle.HorizonAlignType.START);
        focusWorkspace(e)
      }
    });
    
    // Horizon align center
    var halignCenter = toolbar.setupChild('text-align-center', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('text-align-center')), 
        horizonElement);

    halignGroup.addMember(/** @type {thin.ui.ToolbarToggleIconButton} */ (halignCenter));
    halignCenter.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetTextAnchor(thin.editor.TextStyle.HorizonAlignType.MIDDLE);
        focusWorkspace(e);
      }
    });
    
    // Horizon align right
    var halignRight = toolbar.setupChild('text-align-right', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('text-align-right')), 
        horizonElement);

    halignGroup.addMember(/** @type {thin.ui.ToolbarToggleIconButton} */ (halignRight));
    halignRight.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetTextAnchor(thin.editor.TextStyle.HorizonAlignType.END);
        focusWorkspace(e);
      }
    });

    // Text Vertical Alignments
    var verticalElement = dom.getElement('tbar-vertical-text-align');
    var valignGroup = new thin.ui.ToggleGroup();
    
    // Vertical align top
    var valignTop = toolbar.setupChild('text-valign-top', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('text-valign-top')), 
        verticalElement);

    valignGroup.addMember(/** @type {thin.ui.ToolbarToggleIconButton} */ (valignTop));
    valignTop.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetVerticalAlign(thin.editor.TextStyle.VerticalAlignType.TOP);
        focusWorkspace(e)
      }
    });
    
    // Vertical align center
    var valignMiddle = toolbar.setupChild('text-valign-center', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('text-valign-center')), 
        verticalElement);

    valignGroup.addMember(/** @type {thin.ui.ToolbarToggleIconButton} */ (valignMiddle));
    valignMiddle.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetVerticalAlign(thin.editor.TextStyle.VerticalAlignType.CENTER);
        focusWorkspace(e);
      }
    });
    
    // Vertical align right
    var valignBottom = toolbar.setupChild('text-valign-bottom', 
        new thin.ui.ToolbarToggleIconButton(new thin.ui.Icon('text-valign-bottom')), 
        verticalElement);

    valignGroup.addMember(/** @type {thin.ui.ToolbarToggleIconButton} */ (valignBottom));
    valignBottom.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionSetVerticalAlign(thin.editor.TextStyle.VerticalAlignType.BOTTOM);
        focusWorkspace(e);
      }
    });

    // Shape Alignments
    var toolAlignments = toolbar.setupChild('shape-align', 
        new thin.ui.ToolbarMenuButton('整列', 
            new thin.ui.Icon('shape-align-left', iconAlign.TOP)), 
        dom.getElement('tbar-shape-align'));
    
    var toolAlignmentsLeft = new thin.ui.MenuItem('左揃え',
          new thin.ui.Icon('shape-align-left'));
    toolAlignments.addItem(toolAlignmentsLeft);
    toolAlignmentsLeft.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAdjustToLeft();
        focusWorkspace(e);
      }
    });
    
    var toolAlignmentsCenter =  new thin.ui.MenuItem('中央揃え',
          new thin.ui.Icon('shape-align-center'));
    toolAlignments.addItem(toolAlignmentsCenter);
    toolAlignmentsCenter.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAdjustToCenter();
        focusWorkspace(e);
      }
    });

    var toolAlignmentsRight = new thin.ui.MenuItem('右揃え',
          new thin.ui.Icon('shape-align-right'));
    toolAlignments.addItem(toolAlignmentsRight);
    toolAlignmentsRight.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAdjustToRight();
        focusWorkspace(e);
      }
    });

    toolAlignments.addItem(new thin.ui.MenuSeparator());
    
    var toolAlignmentsTop = new thin.ui.MenuItem('上揃え',
          new thin.ui.Icon('shape-align-top'));
    toolAlignments.addItem(toolAlignmentsTop);
    toolAlignmentsTop.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAdjustToTop();
        focusWorkspace(e);
      }
    });
    
    var toolAlignmentsMiddle = new thin.ui.MenuItem('上下中央揃え',
          new thin.ui.Icon('shape-align-middle'));
    toolAlignments.addItem(toolAlignmentsMiddle);
    toolAlignmentsMiddle.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAdjustToMiddle();
        focusWorkspace(e);
      }
    });
    
    var toolAlignmentsBottom = new thin.ui.MenuItem('下揃え',
          new thin.ui.Icon('shape-align-bottom'));
    toolAlignments.addItem(toolAlignmentsBottom);
    toolAlignmentsBottom.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAdjustToBottom();
        focusWorkspace(e);
      }
    });
    
    toolAlignments.addItem(new thin.ui.MenuSeparator());

    var versioningModeIsNormal = thin.editor.HistoryManager.Mode.NORMAL;

    var toolAlignmentsWidth = new thin.ui.MenuItem('幅揃え',
          new thin.ui.Icon('shape-align-width'));

    toolAlignments.addItem(toolAlignmentsWidth);
    toolAlignmentsWidth.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAdjustToWidth(versioningModeIsNormal);
        focusWorkspace(e);
      }
    });
    
    var toolAlignmentsHeight = new thin.ui.MenuItem('高さ揃え',
          new thin.ui.Icon('shape-align-height'));
    
    toolAlignments.addItem(toolAlignmentsHeight);
    toolAlignmentsHeight.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAdjustToHeight(versioningModeIsNormal);
        focusWorkspace(e);
      }
    });
    
    
    var toolAlignmentsSize = new thin.ui.MenuItem('サイズ揃え',  
          new thin.ui.Icon('shape-align-size'));
    toolAlignments.addItem(toolAlignmentsSize);
    toolAlignmentsSize.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionAdjustToAspect();
        focusWorkspace(e);
      }
    });
    
    // Layer front
    var toolLayerFrontButton = toolbar.setupChild('layer-front', 
        new thin.ui.ToolbarSplitButton('前面へ移動', 
            new thin.ui.Icon('shape-layer-front')), 
        dom.getElement('tbar-layer-front'));

    toolLayerFrontButton.getButton().addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionLayerInsertBefore();
        focusWorkspace(e);
      }
    });

    var toolLayerBefore = new thin.ui.MenuItem('前面へ移動', 
          new thin.ui.Icon('shape-layer-front'));
    toolLayerFrontButton.addItem(toolLayerBefore);
    toolLayerBefore.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionLayerInsertBefore();
        focusWorkspace(e);
      }
    });

    var toolLayerFront = new thin.ui.MenuItem('最前面へ移動',
          new thin.ui.Icon('shape-layer-foreground'));
    toolLayerFrontButton.addItem(toolLayerFront);
    toolLayerFront.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionLayerInsertFront();
        focusWorkspace(e);
      }
    });
    
    // Layer back
    var toolLayerBackButton = toolbar.setupChild('layer-back', 
        new thin.ui.ToolbarSplitButton('背面へ移動', 
            new thin.ui.Icon('shape-layer-back')), 
        dom.getElement('tbar-layer-back'));
    
    toolLayerBackButton.getButton().addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionLayerInsertAfter();
        focusWorkspace(e);
      }
    });
    
    
    var toolLayerAfter = new thin.ui.MenuItem('背面へ移動',
          new thin.ui.Icon('shape-layer-back'));
    toolLayerBackButton.addItem(toolLayerAfter);
    toolLayerAfter.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionLayerInsertAfter();
        focusWorkspace(e);
      }
    });
    
    var toolLayerBack = new thin.ui.MenuItem('最背面へ移動',
          new thin.ui.Icon('shape-layer-backtop'));
    toolLayerBackButton.addItem(toolLayerBack);
    toolLayerBack.addEventListener(componentEventType.ACTION, function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace) {
        workspace.getAction().actionLayerInsertBack();
        focusWorkspace(e);
      }
    });
    
    // Help and Information
    var toolHelp = toolbar.setupChild('help', 
        new thin.ui.ToolbarButton('ヘルプ', new thin.ui.Icon('help', iconAlign.TOP)), 
        dom.getElement('tbar-help'));
    
    toolHelp.addEventListener(componentEventType.ACTION, function(e) {
      var helpDialog = new thin.ui.Dialog();
      helpDialog.setDisposeOnHide(true);
      helpDialog.setTitle('ヘルプ');
      helpDialog.setWidth(400);
      helpDialog.setButtonSet(thin.ui.Dialog.ButtonSet.typeOk());
      helpDialog.decorate(goog.dom.getElement('help-dialog'));
      goog.dom.setTextContent(goog.dom.getElement('help-dialog-version'), thin.getVersion());
      
      helpDialog.addEventListener(goog.ui.Dialog.EventType.AFTER_HIDE, focusWorkspace);
      
      helpDialog.setVisible(true);
    });

    toolbar.decorate(goog.dom.getElement('thin-toolbar'));
    thin.ui.registerComponent('toolbar', toolbar);
  })();
  
  (function() {
    var tboxview = new thin.ui.ToolboxView();
    main.addChildToLeft(tboxview);
    var toolbox = tboxview.getControl();
    toolbox.addEventListener(componentEventType.SELECT, focusWorkspace);
    
    // Select
    var toolSelect = toolbox.addItem(
        new thin.ui.ToolboxButton(new thin.editor.toolaction.SelectAction(),
          new thin.ui.Icon('tool-select')), 'selector');
    toolSelect.setTooltip('選択ツール');
        
    // Zoom
    var toolZoom = toolbox.addItem(
        new thin.ui.ToolboxButton(new thin.editor.toolaction.ZoomAction(),
          new thin.ui.Icon('tool-zoom')), 'zoom');
    toolZoom.setTooltip('拡大縮小ツール');
    
    // Separator
    toolbox.addItem(new thin.ui.ToolboxSeparator());

    // Rectangle
    var toolRect = toolbox.addItem(
        new thin.ui.ToolboxButton(new thin.editor.toolaction.RectAction(),
          new thin.ui.Icon('tool-rect')), 'rect');
    toolRect.setTooltip('四角形ツール');

    // Ellipse
    var toolEllipse = toolbox.addItem(
        new thin.ui.ToolboxButton(new thin.editor.toolaction.EllipseAction(),
          new thin.ui.Icon('tool-ellipse')), 'ellipse');
    toolEllipse.setTooltip('楕円形ツール');

    // Line
    var toolLine = toolbox.addItem(
          new thin.ui.ToolboxButton(new thin.editor.toolaction.LineAction(),
            new thin.ui.Icon('tool-line')), 'line');
    toolLine.setTooltip('線形ツール');
    
    // Text
    var toolText = toolbox.addItem(
        new thin.ui.ToolboxButton(new thin.editor.toolaction.TextAction(),
          new thin.ui.Icon('tool-text')), 'text');
    toolText.setTooltip('テキストツール');

    // Image
    var toolImage = toolbox.addItem(
        new thin.ui.ToolboxButton(new thin.editor.toolaction.ImageAction(),
          new thin.ui.Icon('tool-image')), 'image');
    toolImage.setTooltip('画像ツール');
    
    // Separator
    toolbox.addItem(new thin.ui.ToolboxSeparator());
    
    // Tblock
    var toolTblock = toolbox.addItem(
        new thin.ui.ToolboxButton(new thin.editor.toolaction.TblockAction(),
          new thin.ui.Icon('tool-tblock')), 'tblock');
    toolTblock.setTooltip('テキストブロックツール');
    
    // Imageblock
    var toolTblock = toolbox.addItem(
        new thin.ui.ToolboxButton(new thin.editor.toolaction.ImageblockAction(),
          new thin.ui.Icon('tool-iblock')), 'iblock');
    toolTblock.setTooltip('画像ブロックツール');
    
    // Separator
    toolbox.addItem(new thin.ui.ToolboxSeparator());
    
    // List
    var toolList = toolbox.addItem(
        new thin.ui.ToolboxButton(new thin.editor.toolaction.ListAction(),
          new thin.ui.Icon('tool-list')), 'list');
    toolList.setTooltip('一覧表ツール');
    
    thin.ui.registerComponent('toolbox', toolbox);
  })();

  (function() {
    var propview = new thin.ui.PropertyView('PROPERTY');
    main.addChildToRight(propview);
    thin.ui.registerComponent('proppane', propview.getControl());
  })();
  (function() {
    var textEditorDialog = new thin.ui.Dialog();
    textEditorDialog.setTitle('テキスト編集');
    textEditorDialog.setWidth(316);
    textEditorDialog.setButtonSet(thin.ui.Dialog.ButtonSet.typeOkCancel());
    
    var textEditArea = new goog.ui.Textarea('');
    textEditArea.render(goog.dom.getElement('dialog-texteditor-textarea'));
    textEditorDialog.decorate(goog.dom.getElement('dialog-text-editor'));
    textEditorDialog.setControl('textarea', textEditArea);
    
    textEditorDialog.addEventListener(goog.ui.Dialog.EventType.AFTER_HIDE, focusWorkspace);

    thin.ui.registerComponent('texteditor', textEditorDialog);
   })();
  (function() {
    goog.global['onbeforeclose'] = function() {
      var pageCount = tabpane.getPageCount();
      var isChanged = false;
      (function() {
        for(var count = 0; count < pageCount; count++) {
          if(tabpane.getPage(count).getContent().isChanged()) {
            isChanged = true;
            return;
          }
        }
      })();

      if (isChanged) {
        var confirmDialogFromWindow = new thin.ui.Message.confirm(
              '保存されていないファイルがあります。<br />保存しますか ？', '確認',
              function(e) {
                if (e.isYes()) {
                  confirmDialogFromWindow.setVisible(false);
                  var removePage = tabpane.getSelectedPage();
                  var removeWorkspace;
                  while (removePage) {
                    removeWorkspace = removePage.getContent();
                    if (removeWorkspace.isChanged() && !removeWorkspace.save()) {
                      return;
                    }
                    tabpane.destroyPage(removePage);
                    removePage = tabpane.getSelectedPage();
                  }
                }
                
                if(!e.isCancel()) {
                  goog.global['onbeforeclose'] = null;
                  goog.global['close']();
                }
                
              }, thin.ui.Dialog.ButtonSet.typeYesNoCancel());
        return false;
      } else {
        return true;
      }
    };
  })();
  
  goog.events.listen(goog.global, goog.events.EventType.UNLOAD, 
    function(e) {
      goog.object.forEach(thin.ui.components, function(obj) {
        goog.isFunction(obj.dispose) && obj.dispose();
      });
      delete thin.ui.components;
      thin.ui.Notification.dispose();
      return true;
    }, false);
    
  goog.events.listen(goog.global, goog.events.EventType.KEYDOWN, 
    function(e) {
      var workspace = thin.editor.getActiveWorkspace();
      if (workspace && e.ctrlKey) {
        if (e.keyCode == goog.events.KeyCodes.S) {
          if (e.shiftKey) {
            workspace.saveAs();
          } else {
            workspace.save();
          }
          e.preventDefault();
          return;
        }
      }
    }, false);
  
  initUiStatus();
};

goog.exportProperty(goog.global, 'setup', thin.setup);