import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
    isShow: stores.rechargeStore.popStatus.get('isShowProtocol'),
    closePop: stores.rechargeStore.closePop.bind(stores.rechargeStore)
  };
  return props;
}) @observer
class PopProtocol extends Component {
  render() {
    const { isShow, closePop } = this.props;
    const classname = classnames({
      'pop-layer': true,
      'pop-protocol': true,
      'pop-show': isShow
    });
    return (
        <div className={classname} >
          <section className="pop-mask"></section>
          <section className="pop-body pop-body-protocol">
            <div className="title txt-center font-title font-bold">迅雷小游戏许可及服务协议 </div>
            <div className="bd">
              <p className="txt-center font-middle font-bold">《健康游戏忠告》</p>
              <p className="txt-center">抵制不良游戏，拒绝盗版游戏；</p>
              <p className="txt-center">注意自我保护，谨防受骗上当；</p>
              <p className="txt-center btm-margin">适度游戏益脑，沉迷游戏伤身。</p>
              <p className="txt-left txt-indent btm-margin">《迅雷小游戏许可及服务协议》（以下简称“本协议”）由您与迅雷小游戏服务提供方即深圳市迅雷经济咨询有限公司共同缔结，本协议具有合同效力。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议。限制、免责条款可能以黑体加粗形式提示您注意。 </p>
              <p className="txt-left txt-indent btm-margin">除非您已阅读并接受本协议所有条款，否则您无权使用迅雷小游戏服务。您使用迅雷小游戏服务即视为您已阅读并同意签署本协议。 </p>
              <p className="txt-left txt-indent btm-margin">如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。 </p>
              <p className="txt-left font-middle font-bold">一、【定义】 </p>
              <p className="txt-left txt-indent">1.1 本协议：指本协议正文、游戏规则及其修订版本。内容一经正式发布，即为本协议不可分割的组成部分。本协议同时还包括文化部根据《网络游戏管理暂行办法》（文化部令第49号）制定的《网络游戏服务格式化协议必备条款》（http://zwgk.mcprc.gov.cn/auto255/201007/t20100730_20781.html ）。</p>
              <p className="txt-left txt-indent">1.2 游戏规则：指迅雷小游戏服务提供方不时发布并修订的关于迅雷小游戏的用户守则、玩家条例、游戏公告及通知等内容。 </p>
              <p className="txt-left txt-indent">1.3 迅雷小游戏服务提供方：指向您提供迅雷小游戏及其服务的深圳市迅雷经济咨询有限公司，在本协议中简称为“迅雷经济咨询”。 </p>
              <p className="txt-left txt-indent">1.4 迅雷小游戏：指由迅雷经济咨询负责运营的游戏的统称，包括计算机客户端游戏、网页游戏、移动终端游戏等形式的游戏；迅雷小游戏可能以软件形式提供，这种情况下，迅雷小游戏还包括该相关软件及相关文档。</p>
              <p className="txt-left txt-indent">1.5 迅雷小游戏服务：指迅雷经济咨询向您提供的与游戏相关的各项在线运营服务。 </p>
              <p className="txt-left txt-indent">1.6 您：又称“玩家”或“用户”，指被授权使用迅雷小游戏及其服务的自然人。</p>
              <p className="txt-left btm-margin txt-indent">1.7 游戏数据：指您在使用迅雷小游戏过程中产生的被服务器记录的各种数据，包括游戏日志、安全日志等数据。 </p>
              <p className="txt-left font-middle font-bold">二、【协议的变更和生效】 </p>
              <p className="txt-left txt-indent">2.1 迅雷经济咨询有权在必要时变更本协议条款，并在相关页面进行通知。您可以在迅雷小游戏的相关页面查阅最新版本的协议条款。 </p>
              <p className="txt-left btm-margin txt-indent">2.2 本协议条款变更后，如果您继续使用迅雷小游戏服务，即视为您已接受变更后的协议。如果您不接受变更后的协议，应当停止使用迅雷小游戏服务。</p>
              <p className="txt-left font-middle font-bold">三、【游戏账号】</p>
              <p className="txt-left txt-indent">3.1 您如果需要使用和享受迅雷小游戏，则您需要将您享有使用权的迅雷账号或微信账号作为游戏账号，并按照《网络游戏管理暂行规定》及文化部《网络游戏服务格式化协议必备条款》（http://zwgk.mcprc.gov.cn/auto255/201007/t20100730_20781.html）的要求，登录实名注册系统并进行实名注册。您对该迅雷账号和微信账号的申请、使用等行为应符合迅雷经济咨询不时修订并公布的相关协议规范。</p>
              <p className="txt-left txt-indent">3.2 您充分理解并同意：迅雷经济咨询会按照国家相关要求将您的实名注册信息运用于防沉迷系统之中，即迅雷经济咨询可能会根据您的实名注册信息判断您是否年满18周岁，从而决定是否对您的游戏账号予以防沉迷限制。</p>
              <p className="txt-left txt-indent">3.3 您应妥善保管您的游戏账号，包括妥善保管您游戏账号所对应的迅雷账号及密码，以及微信账号及密码；您应在知晓您的游戏账号被盗用后第一时间通知迅雷经济咨询。</p>
              <p className="txt-left txt-indent">3.4 您充分理解并同意，为提高迅雷小游戏服务的安全水平，迅雷经济咨询有权将有关技术或软件应用到迅雷小游戏中，但迅雷经济咨询不保证这些安全保障措施可以完全杜绝游戏账号被他人窃取或丢失的风险。</p>
              <p className="txt-left txt-indent">3.5 您充分理解并同意，若迅雷经济咨询依照相关业务规则限制、冻结或终止您的迅雷账号或微信账号的使用，可能会导致您游戏账号下游戏数据及相关信息被删除，以及相关权益的丧失，该损失由您自行承担，对此迅雷经济咨询不承担任何责任。</p>
              <p className="txt-left btm-margin txt-indent">3.6 您充分理解并同意，为高效利用服务器资源，如果您长期未使用游戏账号登录迅雷小游戏，迅雷经济咨询有权视需要，在提前通知的情况下，对该账号及其账号下的游戏数据及相关信息采取删除等处置措施，上述处置可能导致您对该游戏账号下相关权益的丧失，对此迅雷经济咨询不承担任何责任。</p>
              <p className="txt-left font-middle font-bold">四、【用户信息收集、使用及保护】</p>
              <p className="txt-left txt-indent">4.1 您同意并授权迅雷经济咨询为履行本协议之目的收集您的用户信息，这些信息包括您在实名注册系统中注册的信息、您游戏账号下的游戏数据以及其他您在使用迅雷小游戏服务的过程中向迅雷经济咨询提供或迅雷经济咨询基于安全、用户体验优化等考虑而需收集的信息，迅雷经济咨询对您的用户信息的收集将遵循相关法律的规定。</p>
              <p className="txt-left txt-indent">4.2 您充分理解并同意：为更好地向您提供迅雷小游戏服务，迅雷经济咨询可以将您的用户信息提交给其关联公司，且迅雷经济咨询有权自行或通过第三方对您的用户信息进行整理、统计、分析及利用。</p>
              <p className="txt-left txt-indent">4.3 您充分理解并同意：迅雷经济咨询或其合作的第三方可以根据您的用户信息，通过短信、电话、邮件等各种方式向您提供关于迅雷小游戏的活动信息、推广信息等各类信息。</p>
              <p className="txt-left txt-indent">4.4 迅雷经济咨询保证不对外公开或向任何第三方提供您的个人信息，但是存在下列情形之一的除外：</p>
              <p className="txt-left txt-indent ">（1）公开或提供相关信息之前获得您许可的；</p>
              <p className="txt-left txt-indent ">（2）根据法律或政策的规定而公开或提供的；</p>
              <p className="txt-left txt-indent ">（3）只有公开或提供您的个人信息，才能提供您需要的迅雷小游戏服务的；</p>
              <p className="txt-left txt-indent ">（4）根据国家权力机关要求公开或提供的；</p>
              <p className="txt-left txt-indent btm-margin">（5）根据本协议其他条款约定而公开或提供的。</p>
              <p className="txt-left font-middle font-bold">五、【迅雷小游戏服务】</p>
              <p className="txt-left txt-indent">5.1 在您遵守本协议及相关法律法规的前提下，迅雷经济咨询给予您一项个人的、不可转让及非排他性的许可，以使用迅雷小游戏服务。您仅可为非商业目的使用迅雷小游戏服务，包括：</p>
              <p className="txt-left txt-indent ">（1）接收、下载、安装、启动、升级、登录、显示、运行和/或截屏迅雷小游戏；</p>
              <p className="txt-left txt-indent ">（2）创建游戏角色，设置网名，查阅游戏规则、用户个人资料、游戏对局结果，开设游戏房间、设置游戏参数，在游戏中购买、使用游戏道具、游戏装备、游戏币等，使用聊天功能、社交分享功能；</p>
              <p className="txt-left txt-indent ">（3）使用迅雷小游戏支持并允许的其他某一项或几项功能。</p>
              <p className="txt-left txt-indent">5.2 您在使用迅雷小游戏服务过程中不得未经迅雷经济咨询许可以任何方式录制并向他人传播迅雷小游戏内容，包括不得利用任何第三方软件进行网络传播等。</p>
              <p className="txt-left txt-indent">5.3 在迅雷小游戏以软件形式提供的情况下，您在使用迅雷小游戏及迅雷小游戏服务时还应符合本协议第六条关于软件许可的规定。</p>
              <p className="txt-left txt-indent">5.4 本条及本协议其他条款未明示授权的其他一切权利仍由迅雷经济咨询保留，您在行使这些权利时须另外取得迅雷经济咨询的书面许可。</p>
              <p className="txt-left txt-indent">5.5 如果迅雷经济咨询发现或收到他人举报或投诉用户违反本协议约定的，迅雷经济咨询有权不经通知随时对相关内容进行删除，并视行为情节对违规游戏账号处以包括但不限于警告、限制或禁止使用全部或部分功能、游戏账号封禁直至注销的处罚，并公告处理结果。</p>
              <p className="txt-left txt-indent">5.6 您充分理解并同意，迅雷经济咨询有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应独自承担由此而产生的一切法律责任。</p>
              <p className="txt-left txt-indent">5.7 您充分理解并同意，因您违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，您应当独立承担责任；迅雷经济咨询因此遭受损失的，您也应当一并赔偿。</p>
              <p className="txt-left txt-indent">5.8 您充分理解并同意：游戏道具、游戏装备、游戏币等是迅雷小游戏服务的一部分，迅雷经济咨询在此许可您依本协议而获得其使用权。您购买、使用游戏道具、游戏装备、游戏币等应遵循本协议、游戏具体规则的要求；同时，游戏道具、游戏装备、游戏币等可能受到一定有效期限的限制，若您在规定的有效期内未使用，除不可抗力或可归责于迅雷经济咨询的原因外，一旦有效期届满，将会自动失效。</p>
              <p className="txt-left txt-indent">5.9 您充分理解并同意：为营造公平、健康的游戏环境，在您使用迅雷小游戏服务的过程中，迅雷经济咨询有权通过技术手段了解您终端设备的随机存储内存以及与迅雷小游戏同时运行的相关程序。一经发现有任何未经授权的、危害迅雷小游戏服务正常运营的相关程序，迅雷经济咨询将收集所有与此有关的信息并采取合理措施予以打击。</p>
              <p className="txt-left txt-indent">5.10 您充分理解并同意：为了保证您及其他用户的游戏速度，迅雷经济咨询有权定期转移或者清除迅雷小游戏服务器上存储的一些过往的游戏数据。</p>
              <p className="txt-left txt-indent btm-margin">5.11 迅雷经济咨询将按照相关法律法规和本协议的规定，采取切实有效的措施保护未成年人在使用迅雷小游戏服务过程中的合法权益，包括可能采取技术措施、禁止未成年人接触不适宜的游戏或者游戏功能、限制未成年人的游戏时间、预防未成年人沉迷网络。作为游戏规则的一部分，迅雷经济咨询还将在适当位置发布迅雷小游戏用户指引和警示说明，包括游戏内容介绍、正确使用游戏的方法以及防止危害发生的方法。所有未成年人用户都应在法定监护人的指导下仔细阅读并遵照执行这些指引和说明；其他玩家在使用迅雷小游戏服务的过程中应避免发布、产生任何有损未成年人身心健康的内容，共同营造健康游戏环境。</p>
              <p className="txt-left font-middle font-bold">六、【软件许可】</p>
              <p className="txt-left txt-indent">6.1 使用迅雷小游戏服务可能需要下载并安装相关软件，您可以直接从迅雷经济咨询的相关网站上获取该软件，也可以从得到迅雷经济咨询授权的第三方获取。如果您从未经迅雷经济咨询授权的第三方获取迅雷小游戏或与迅雷小游戏名称相同的游戏，将视为您未获得迅雷经济咨询授权，迅雷经济咨询无法保证该游戏能够正常使用，并对因此给您造成的损失不予负责。</p>
              <p className="txt-left txt-indent">6.2 迅雷经济咨询可能为不同的终端设备或操作系统开发了不同的软件版本，包括但不限于windows、ios、android、windows phone、symbian、blackberry等多个应用版本，您应当根据实际情况选择下载合适的版本进行安装，下载安装程序后，您需要按照该程序提示的步骤正确安装。</p>
              <p className="txt-left txt-indent">6.3 若迅雷小游戏以软件形式提供，迅雷经济咨询给予您一项个人的、不可转让及非排他性的许可。您仅可为非商业目的在单一台终端设备上下载、安装、登录、使用该迅雷小游戏。</p>
              <p className="txt-left txt-indent">6.4 为提供更加优质、安全的服务，在软件安装时迅雷经济咨询可能推荐您安装其他软件，您可以选择安装或不安装。</p>
              <p className="txt-left txt-indent">6.5 如果您不再需要使用该软件或者需要安装新版，可以自行卸载。如果您愿意帮助迅雷经济咨询改进产品服务，请告知卸载的原因。</p>
              <p className="txt-left txt-indent">6.6 为了保证迅雷小游戏服务的安全性和功能的一致性，迅雷经济咨询有权不经向您特别通知而对软件进行更新，或者对软件的部分功能效果进行改变或限制。</p>
              <p className="txt-left txt-indent btm-margin">6.7 软件新版本发布后，旧版本的软件可能无法使用。迅雷经济咨询不保证旧版本软件继续可用及相应的客户服务，请您随时核对并下载最新版本。</p>
              <p className="txt-left font-middle font-bold">七、【用户行为规范】</p>
              <p className="txt-left txt-indent">7.1 您充分了解并同意，您必须为自己游戏账号下的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。您应对迅雷小游戏中的内容自行加以判断，并承担因使用迅雷小游戏服务而引起的所有风险，包括因对迅雷小游戏内容的正确性、完整性或实用性的依赖而产生的风险。迅雷经济咨询无法且不会对因前述风险而导致的任何损失或损害承担责任。</p>
              <p className="txt-left txt-indent">7.2 您除了可以按照本协议的约定使用迅雷小游戏服务之外，不得进行任何侵犯迅雷小游戏的知识产权的行为，或者进行其他的有损于迅雷经济咨询或其他第三方合法权益的行为。</p>
              <p className="txt-left txt-indent">7.3 除非法律允许或迅雷经济咨询书面许可，您不得从事下列行为：</p>
              <p className="txt-left txt-indent ">（1）删除游戏软件及其副本上关于著作权的信息；</p>
              <p className="txt-left txt-indent ">（2）对游戏软件进行反向工程、反向汇编、反向编译或者以其他方式尝试发现软件的源代码；</p>
              <p className="txt-left txt-indent ">（3）对游戏软件进行扫描、探查、测试，以检测、发现、查找其中可能存在的BUG或弱点；</p>
              <p className="txt-left txt-indent ">（4）对游戏软件或者软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经合法授权的第三方工具/服务接入软件和相关系统；</p>
              <p className="txt-left txt-indent ">（5）修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论上述行为是否为商业目的；</p>
              <p className="txt-left txt-indent ">（6）通过非迅雷经济咨询开发、授权的第三方软件、插件、外挂、系统，使用迅雷小游戏及迅雷小游戏服务，或制作、发布、传播非迅雷经济咨询开发、授权的第三方软件、插件、外挂、系统；</p>
              <p className="txt-left txt-indent ">（7）对游戏中迅雷经济咨询拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等；</p>
              <p className="txt-left txt-indent ">（8）建立有关迅雷小游戏的镜像站点，或者进行网页（络）快照，或者利用架设服务器等方式，为他人提供与迅雷小游戏服务完全相同或者类似的服务；</p>
              <p className="txt-left txt-indent ">（9）将迅雷小游戏的任意部分分离出来单独使用，或者进行其他的不符合本协议的使用；</p>
              <p className="txt-left txt-indent ">（10）使用迅雷小游戏的名称、商标或其它知识产权；</p>
              <p className="txt-left txt-indent ">（11）其他未经迅雷经济咨询明示授权的行为。</p>
              <p className="txt-left txt-indent">7.4 您在使用迅雷小游戏服务过程中有如下行为的，迅雷经济咨询将视情节严重程度，依据本协议及相关游戏规则的规定，对您做出暂时或永久性地禁止登录、删除游戏账号及游戏数据、删除相关信息等处理措施，情节严重的将移交有关行政管理机关给予行政处罚，或者追究您的刑事责任：</p>
              <p className="txt-left txt-indent ">（1）以某种方式暗示或伪称迅雷经济咨询内部员工或某种特殊身份，企图得到不正当利益或影响其他用户权益的行为；</p>
              <p className="txt-left txt-indent ">（2）在迅雷小游戏中使用非法或不当词语、字符等，包括用于角色命名；</p>
              <p className="txt-left txt-indent ">（3）以任何方式破坏迅雷小游戏或影响迅雷小游戏服务的正常进行；</p>
              <p className="txt-left txt-indent ">（4）各种非法外挂行为；</p>
              <p className="txt-left txt-indent ">（5）传播非法言论或不当信息；</p>
              <p className="txt-left txt-indent ">（6）盗取他人游戏账号、游戏物品；</p>
              <p className="txt-left txt-indent ">（7）私自进行游戏账号交易；</p>
              <p className="txt-left txt-indent ">（8）私自进行游戏道具、游戏装备、游戏币等交易；</p>
              <p className="txt-left btm-margin">（9）其他在行业内被广泛认可的不当行为，无论是否已经被本协议或游戏规则明确列明。 </p>
              <p className="txt-left font-middle font-bold">八、【免责声明】</p>
              <p className="txt-left txt-indent">8.1 迅雷小游戏服务以“现状”提供给您。迅雷经济咨询不保证：迅雷小游戏服务无错误及不会中断、所有缺陷已被更正、或迅雷小游戏服务不会受到病毒或任何其它因素的损害。除非有法律明确规定，迅雷经济咨询在此明确声明不承担任何明示或默示的担保责任，包括但不限于对迅雷小游戏服务的性能、适用性或不侵权的担保。</p>
              <p className="txt-left txt-indent">8.2 在任何情况下，迅雷经济咨询不对因不可抗力导致的您在使用迅雷小游戏服务过程中遭受的损失承担责任。该等不可抗力事件包括但不限于国家法律、法规、政策及国家机关的命令或者其它的诸如地震、水灾、雪灾、火灾、海啸、台风、罢工、战争等不可预测、不可避免且不可克服的事件。</p>
              <p className="txt-left txt-indent">8.3迅雷经济咨询可独立决定随时变更、终止、中止您对任何迅雷小游戏服务的使用，无须向您发出任何提前通知，但根据法律法规规定或您与迅雷经济咨询的约定需要提前通知的除外。若因您的行为违反法律法规的规定或本协议的规定，迅雷经济咨询根据相关规定终止、中止您使用任何迅雷小游戏服务，则迅雷经济咨询无须向您承担任何责任，且有权要求您承担相应的责任。</p>
              <p className="txt-left txt-indent">8.4 迅雷小游戏可能因游戏软件BUG、版本更新缺陷、第三方病毒攻击或其他任何因素导致您的游戏角色、游戏道具、游戏装备及游戏币等账号数据发生异常。在数据异常的原因未得到查明前，迅雷经济咨询有权暂时冻结该游戏账号；若查明数据异常为非正常游戏行为，迅雷经济咨询有权恢复游戏账号数据至异常发生前的原始状态（包括向第三方追回被转移数据），且迅雷经济咨询无须向您承担任何责任。</p>
              <p className="txt-left txt-indent">8.5 迅雷经济咨询未授权您从任何第三方通过购买、接受赠与或者其他的方式获得游戏账号、游戏道具、游戏装备、游戏币等，迅雷经济咨询不对第三方交易的行为负责，并且不受理因任何第三方交易发生纠纷而带来的申诉。</p>
              <p className="txt-left txt-indent">8.6 您充分理解到：第三方在迅雷小游戏中投放的广告、链接或者其它形式的推广内容，均是由其自行提供的，您应当自行判断其真实性，迅雷经济咨询对其推广内容不作任何明示或者默示的担保。</p>
              <p className="txt-left txt-indent">8.7 您充分理解到：不同操作系统之间存在不互通的客观情况，该客观情况并非迅雷经济咨询造成，由此可能导致您在某一操作系统中的充值和游戏数据不能顺利转移到另一操作系统中。由于您在不同系统进行切换造成的充值损失和游戏数据丢失风险应由您自行承担，不得要求迅雷经济咨询承担任何责任。</p>
              <p className="txt-left txt-indent btm-margin">8.8 您充分理解到：迅雷小游戏中可能会设置强制对战区域或玩法，如果您不同意强制对战，请您不要进入该游戏或游戏区域；您的进入，将被视为同意该玩法并接受相应后果。</p>
              <p className="txt-left font-middle font-bold">九、【知识产权】</p>
              <p className="txt-left txt-indent">9.1 迅雷经济咨询是迅雷小游戏的知识产权权利人。迅雷小游戏的一切著作权、商标权、专利权、商业秘密等知识产权，以及与迅雷小游戏相关的所有信息内容（包括文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律法规和相应的国际条约保护，迅雷经济咨询享有上述知识产权，但相关权利人依照法律规定应享有的权利除外。</p>
              <p className="txt-left txt-indent">9.2 您在使用迅雷小游戏服务中产生的游戏数据的所有权和知识产权归迅雷经济咨询所有，迅雷经济咨询有权处置该游戏数据。</p>
              <p className="txt-left txt-indent btm-margin">9.3 迅雷小游戏可能涉及第三方知识产权，而该等第三方对您基于本协议在迅雷小游戏中使用该等知识产权有要求的，迅雷经济咨询将以适当方式向您告知该要求，您应当一并遵守。</p>
              <p className="txt-left font-middle font-bold">十、【遵守当地法律监管】</p>
              <p className="txt-left txt-indent">10.1 您在使用迅雷小游戏服务过程中应当遵守当地相关的法律法规，并尊重当地的道德和风俗习惯。如果您的行为违反了当地法律法规或道德风俗，您应当为此独立承担责任。</p>
              <p className="txt-left txt-indent btm-margin">10.2 您应避免因使用迅雷小游戏服务而使迅雷经济咨询卷入政治和公共事件，否则迅雷经济咨询有权暂停或终止对您的服务。</p>
              <p className="txt-left font-middle font-bold">十一、【用户个人信息保护】</p>
              <p className="txt-left txt-indent">11.1保护用户个人信息是迅雷经济咨询的一项基本原则。迅雷经济咨询将按照本协议及相关政策的规定收集、使用、储存和分享您的个人信息，保护您的隐私。</p>
              <p className="txt-left txt-indent">11.2您在注册帐号或使用本服务的过程中，可能需要填写一些必要的信息。若国家法律法规有特殊规定的，您需要填写真实的身份信息。若您填写的信息不完整，则无法使用本服务或在使用过程中受到限制。</p>
              <p className="txt-left txt-indent">11.3一般情况下，您可随时浏览、修改自己提交的信息，但出于安全性和身份识别的考虑，您可能无法修改注册时提供的初始注册信息及其他验证信息。</p>
              <p className="txt-left txt-indent">11.4迅雷经济咨询将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</p>
              <p className="txt-left txt-indent">11.5迅雷经济咨询不会将您的个人信息转移或披露给任何非关联的第三方，除非：</p>
              <p className="txt-left txt-indent ">（1）相关法律法规或法院、政府机关要求；</p>
              <p className="txt-left txt-indent ">（2）为完成合并、分立、收购或资产转让而转移；或</p>
              <p className="txt-left txt-indent btm-margin ">（3）为提供您要求的服务所必需。</p>
              <p className="txt-left font-middle font-bold">十二、【管辖与法律适用】</p>
              <p className="txt-left txt-indent">12.1 本协议签订地为中华人民共和国广东省深圳市南山区。</p>
              <p className="txt-left txt-indent">12.2 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p>
              <p className="txt-left txt-indent">12.3 若您和迅雷经济咨询之间因本协议发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交至本协议签订地有管辖权的人民法院管辖。</p>
              <p className="txt-left txt-indent">12.4 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
              <p className="txt-left txt-indent btm-margin">12.5 本协议条款无论因何种原因部分无效，其余条款仍有效，对各方具有约束力。</p>
              <p className="txt-left font-middle font-bold">十三、【其他】</p>
              <p className="txt-left txt-indent">13.1 根据国家新闻出版总署关于健康游戏的忠告，迅雷经济咨询提醒您：抵制不良游戏，拒绝盗版游戏；注意自我保护，谨防受骗上当；适度游戏益脑，沉迷游戏伤身。</p>
              <p className="txt-left txt-indent btm-margin">13.2 如果您对本协议或迅雷小游戏服务有意见或建议，可与迅雷经济咨询客户服务部门联系，我们会给予您必要的帮助。</p>
              <p className="txt-right txt-indent btm-margin">深圳市迅雷经济咨询有限公司</p>
            </div>
            <div className="close-btn" onClick={ () => { closePop('isShowProtocol', false); }}></div>
          </section>
        </div>
    );
  }
}

export default PopProtocol;
