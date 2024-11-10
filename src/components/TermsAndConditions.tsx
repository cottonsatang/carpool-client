import React from "react";
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from "../constants";

const TermsAndConditions = ({scrollViewRef}: any) => {
    return (
        <ScrollView
            ref={scrollViewRef}
            style={styles.container}>
            <Text style={styles.sectionTitle}>카풀 앱 이용 약관</Text>
            <Text style={styles.content}>
                <Text style={styles.articleTitle}>제1조 (목적)</Text>{'\n\n'}
                이 약관은 본 카풀 애플리케이션의 서비스(이하 '서비스')의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제2조 (정의)</Text>{'\n\n'}
                "회사"는 본 카풀 앱의 운영자로, 앱과 관련된 서비스 제공의 주체를 의미합니다.{'\n'}
                "회원"은 본 약관에 따라 회사와 이용 계약을 체결하고 서비스 이용 자격을 부여받은 자를 의미합니다.{'\n'}
                "운전자"는 차량을 소유하고, 탑승자를 태우기 위해 서비스를 사용하는 회원입니다.{'\n'}
                "탑승자"는 운전자의 차량에 탑승하는 것을 목적으로 서비스를 이용하는 회원을 의미합니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제3조 (서비스의 제공 및 변경)</Text>{'\n\n'}
                회사는 다음과 같은 서비스를 제공합니다.{'\n'}
                1.출발지와 목적지 선택을 통한 카풀 예약{'\n'}
                2.실시간 위치 공유 기능{'\n'}
                3.요금 계산 및 결제 시스템{'\n'}
                회사는 운영상의 필요에 따라 제공하는 서비스를 변경할 수 있습니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제4조 (회원가입 및 계정 관리)</Text>{'\n\n'}
                회원가입은 본 약관에 동의한 후 학교 이메일 인증 절차를 통해 가능합니다.{'\n'}
                회원은 본인의 정보가 정확하고 최신 상태로 유지되도록 관리해야 합니다.{'\n'}
                회사는 부정확한 정보로 인한 서비스 제공의 오류에 대해 책임지지 않습니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제5조 (서비스 이용 및 제한)</Text>{'\n\n'}
                회원은 법령과 본 약관, 회사가 제공하는 안내에 따라 서비스를 이용해야 합니다.{'\n'}
                회원은 타인의 서비스 이용을 방해하거나 회사의 운영을 저해하는 행위를 할 수 없습니다.{'\n'}
                운전자는 등록된 차량 정보와 일치하는 차량으로 서비스해야 하며, 탑승자는 등록한 본인의 계정으로만 탑승 가능합니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제6조 (요금 및 결제)</Text>{'\n\n'}
                본 서비스의 요금은 사용자가 출발지와 목적지 선택 시 제공되는 예상 요금으로 책정됩니다.{'\n'}
                운행 완료 후 실제 요금은 최종적으로 산정되며, 결제는 회사의 시스템을 통해 자동으로 이루어집니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제7조 (개인정보 보호 및 사용)</Text>{'\n\n'}
                회사는 회원의 개인정보를 보호하기 위해 노력하며, 관련 법령에 따라 개인정보를 수집, 이용, 처리합니다.{'\n'}
                회원의 동의 없이 회원의 개인정보를 제3자에게 제공하지 않습니다.{'\n'}
                회사는 서비스 제공을 위해 위치 정보 및 차량 정보를 수집할 수 있습니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제8조 (책임의 제한)</Text>{'\n\n'}
                회사는 회원 간의 카풀 서비스에 대한 책임을 지지 않습니다. 단, 회사의 귀책 사유가 있는 경우는 예외로 합니다.{'\n'}
                회원 간 발생한 문제나 분쟁에 대해 회사는 개입하지 않으며, 해당 회원 간 협의로 해결해야 합니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제9조 (면책 조항)</Text>{'\n\n'}
                회사는 천재지변, 네트워크 장애 등 불가피한 사유로 서비스 제공이 어려운 경우 책임을 지지 않습니다.{'\n'}
                회사는 회원이 서비스 이용 중 기대하는 이익을 얻지 못한 것에 대해 책임을 지지 않습니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제10조 (기타)</Text>{'\n\n'}
                본 약관에 명시되지 않은 사항은 관련 법령에 따릅니다.{'\n'}
                회사는 필요 시 본 약관을 변경할 수 있으며, 변경된 약관은 회원에게 공지 후 효력이 발생합니다.
            </Text>

            <Text style={styles.sectionTitle}>카풀 사고 이용 약관</Text>
            <Text style={styles.content}>
                <Text style={styles.articleTitle}>제1조 (목적)</Text>{'\n\n'}
                이 약관은 본 카풀 애플리케이션의 서비스 이용에 있어 회원 간의 권리와 의무를 명확히 하여 사고 발생 시 책임 범위를 고지함을 목적으로 합니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제2조 (책임의 제한 및 보험 고지)</Text>{'\n\n'}
                <Text style={styles.articleTitle}>자동차 보험 한계 안내</Text>{'\n\n'}
                카풀 서비스 이용 시, 운전자와 탑승자는 운전자의 개인 자동차 보험이 적용될 수 있으나, 보험사에 따라 상업적 용도로 간주되어 보험 적용이 거부될 수 있음을 고지합니다.{'\n'}
                따라서, 본 서비스를 통해 발생한 사고에 대해 회사는 어떠한 책임도 지지 않으며, 운전자와 탑승자는 각자의 보험 상황을 사전에 확인해야 합니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>회사 면책 조항</Text>{'\n\n'}
                회사는 회원이 서비스 이용 중 발생한 사고, 손해 또는 분쟁에 대해 일절 책임을 지지 않습니다.{'\n'}
                본 서비스는 개인 간의 자발적 카풀을 중개할 뿐이며, 운전자와 탑승자 간의 모든 사고 책임은 본인에게 귀속됩니다.{'\n'}
                운전자는 탑승자를 태우기 전 자신의 자동차 보험 상태와 적용 범위를 확인하고, 보험 적용 거부로 인한 손해 발생 시 이에 대한 책임은 전적으로 운전자 본인에게 있습니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>탑승자 안내 사항</Text>{'\n\n'}
                탑승자는 본 약관을 통해 운전자의 보험 적용 여부와 사고 발생 시의 책임 범위를 충분히 숙지하고 이용에 동의한 것으로 간주됩니다.{'\n'}
                탑승자는 필요 시 본인의 상해보험 등을 이용할 수 있습니다.
                {'\n\n'}
                <Text style={styles.articleTitle}>제3조 (개인 정보 보호 및 보안)</Text>{'\n\n'}
                회사는 회원의 개인정보를 보호하며, 법령에 따라 이를 처리합니다. 단, 보험 처리를 위해 필요한 경우 회원의 정보를 보험사와 공유할 수 있습니다.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
        color: colors.BLACK,
    },
    content: {
        fontSize: 14,
        lineHeight: 22,
        color: colors.GRAY_700,
        marginBottom: 20,
    },
    articleTitle: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 5,
    }
});

export default TermsAndConditions;
