import React from 'react';

// ================= IMPORT ALL TEMPLATES =================

// Fresher
import BankPOFormatTemplate from './layouts/fresher/BankPOFormatTemplate';
import CampusFlowTemplate from './layouts/fresher/CampusFlowTemplate';
import ClearStartTemplate from './layouts/fresher/ClearStartTemplate';
import SarkariStandardTemplate from './layouts/fresher/SarkariStandardTemplate';
import SkillLadderTemplate from './layouts/fresher/SkillLadderTemplate';
import StepOneGridTemplate from './layouts/fresher/StepOneGridTemplate';

// Tech
import AtlasDevTemplate from './layouts/tech/AtlasDevTemplate';
import MonoGridTemplate from './layouts/tech/MonoGridTemplate';
import VerticalPulseTemplate from './layouts/tech/VerticalPulseTemplate';
import VerticalTimelinePro from './layouts/tech/VerticalTimelinePro';
import StartupImpactGridTemplate from './layouts/tech/StartupImpactGridTemplate';

// Professional
import AxisLedgerTemplate from './layouts/professional/AxisLedgerTemplate';
import BoardroomGridTemplate from './layouts/professional/BoardroomGridTemplate';
import ConsultGridMatrixTemplate from './layouts/professional/ConsultGridMatrixTemplate';
import CorporateSplitLineTemplate from './layouts/professional/CorporateSplitLineTemplate';
import FounderMinimalTemplate from './layouts/professional/FounderMinimalTemplate';
import GridlineProTemplate from './layouts/professional/GridlineProTemplate';
import SplitConfidenceTemplate from './layouts/professional/SplitConfidenceTemplate';
import StrataProTemplate from './layouts/professional/StrataProTemplate';
import StrategyClassicEliteTemplate from './layouts/professional/StrategyClassicEliteTemplate';
import VerticalAccentProTemplate from './layouts/professional/VerticalAccentProTemplate';

// Creative
import AsymmetricFocusTemplate from './layouts/creative/AsymmetricFocusTemplate';
import AuroraCanvasTemplate from './layouts/creative/AuroraCanvasTemplate';
import CanvasFlowTemplate from './layouts/creative/CanvasFlowTemplate';
import DynamicTimelineFlow from './layouts/creative/DynamicTimelineFlow';
import EditorialSerifTemplate from './layouts/creative/EditorialSerifTemplate';
import FloatingCardsTemplate from './layouts/creative/FloatingCardsTemplate';
import PortfolioEdgeSidebar from './layouts/creative/PortfolioEdgeSidebar';
import SpectrumSidebandTemplate from './layouts/creative/SpectrumSidebandTemplate';
import SplitBannerImpact from './layouts/creative/SplitBannerImpact';
import SplitHighlightTemplate from './layouts/creative/SplitHighlightTemplate';
import SplitVerticalIdentityTemplate from './layouts/creative/SplitVerticalIdentityTemplate';
import TopBannerPortfolioTemplate from './layouts/creative/TopBannerPortfolioTemplate';

// Executive
import AuthoritySerifTemplate from './layouts/executive/AuthoritySerifTemplate';
import CenteredAuthorityLine from './layouts/executive/CenteredAuthorityLine';
import GlobalExecutiveLuxe from './layouts/executive/GlobalExecutiveLuxe';
import MinimalAuthorityTemplate from './layouts/executive/MinimalAuthorityTemplate';
import MinimalFrameBorderTemplate from './layouts/executive/MinimalFrameBorderTemplate';

// Modern
import BlockSectionModern from './layouts/modern/BlockSectionModern';
import BoldHorizonTemplate from './layouts/modern/BoldHorizonTemplate';
import CenterColumnEditorialTemplate from './layouts/modern/CenterColumnEditorialTemplate';
import CenterTimelineAxisTemplate from './layouts/modern/CenterTimelineAxisTemplate';
import MatrixMinimalGrid from './layouts/modern/MatrixMinimalGrid';
import NeoSplitTemplate from './layouts/modern/NeoSplitTemplate';
import NordicEdgeTemplate from './layouts/modern/NordicEdgeTemplate';
import SplitHeaderEdge from './layouts/modern/SplitHeaderEdge';
import TwoBandModernTemplate from './layouts/modern/TwoBandModernTemplate';
import VerticalTimelineTemplate from './layouts/modern/VerticalTimelineTemplate';
import SwissGridTemplate from './layouts/modern/SwissGridTemplate';

// ================= REGISTRY =================

const REGISTRY: Record<string, React.FC<any>> = {
    BankPOFormatTemplate,
    CampusFlowTemplate,
    ClearStartTemplate,
    SarkariStandardTemplate,
    SkillLadderTemplate,
    StepOneGridTemplate,
    AtlasDevTemplate,
    MonoGridTemplate,
    VerticalPulseTemplate,
    VerticalTimelinePro,
    StartupImpactGridTemplate,
    AxisLedgerTemplate,
    BoardroomGridTemplate,
    ConsultGridMatrixTemplate,
    CorporateSplitLineTemplate,
    FounderMinimalTemplate,
    GridlineProTemplate,
    SplitConfidenceTemplate,
    StrataProTemplate,
    StrategyClassicEliteTemplate,
    VerticalAccentProTemplate,
    AsymmetricFocusTemplate,
    AuroraCanvasTemplate,
    CanvasFlowTemplate,
    DynamicTimelineFlow,
    EditorialSerifTemplate,
    FloatingCardsTemplate,
    PortfolioEdgeSidebar,
    SpectrumSidebandTemplate,
    SplitBannerImpact,
    SplitHighlightTemplate,
    SplitVerticalIdentityTemplate,
    TopBannerPortfolioTemplate,
    AuthoritySerifTemplate,
    CenteredAuthorityLine,
    GlobalExecutiveLuxe,
    MinimalAuthorityTemplate,
    MinimalFrameBorderTemplate,
    BlockSectionModern,
    BoldHorizonTemplate,
    CenterColumnEditorialTemplate,
    CenterTimelineAxisTemplate,
    MatrixMinimalGrid,
    NeoSplitTemplate,
    NordicEdgeTemplate,
    SplitHeaderEdge,
    TwoBandModernTemplate,
    VerticalTimelineTemplate,
    SwissGridTemplate,
};

export const getTemplateComponent = (id: string): React.FC<any> => {
    const Component = REGISTRY[id];
    if (!Component) {
        throw new Error(`Template "${id}" not found in registry.`);
    }
    return Component;
};

// ================= TEMPLATE METADATA =================

export const TEMPLATES = Object.keys(REGISTRY).map(id => ({
    id,
    name: id.replace(/Template$/, ''),
    category: 'professional',
    layout: 'single',
    defaultFont: 'Inter',
    defaultColor: '#000000',
    isPremium: id.includes('Luxe') || id.includes('Executive')
}));

export const PREMIUM_TEMPLATES = new Set(
    TEMPLATES.filter(t => t.isPremium).map(t => t.id)
);
