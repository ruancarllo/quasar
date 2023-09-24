import 'package:flutter/material.dart';

class UniversitiesScreen extends StatelessWidget {
  const UniversitiesScreen({super.key});

  @override Widget build(BuildContext context) {
    return Scaffold(
      appBar:AppBar(
        title: const Center(
          child: Text(
            'Quasar',
            style: TextStyle(
              fontFamily: 'RobotoSlab',
              fontWeight: FontWeight.w700,
              fontSize: 35,
              color: Colors.white
            )
          ),
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(35),
            bottomRight: Radius.circular(35)
          ),
        ),
        toolbarHeight: 120,
        backgroundColor: const Color.fromARGB(255, 112, 72, 232),
        shadowColor: const Color.fromARGB(255, 95, 61, 196),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(32),
        itemCount: universityNames.length,
        itemBuilder: (context, index) {
          return UniversityButton(
            universityName: universityNames[index]
          );
        },
        separatorBuilder: (context, index) {
          return const SizedBox(
            height: 25,
          );
        },
      ),
      backgroundColor: const Color.fromARGB(255, 229, 219, 255),
    );
  }

  static const List<String> universityNames = [
    'Enem',
    'Unesp',
    'Fuvest',
    'Unicamp',
    'Famema',
    'Famerp',
    'Ufscar',
    'FGV-SP',
    'PUC-SP',
    'Fatec',
    'Fmabc',
    'Ufabc',
    'Ita',
    'Ime',
    'Insper',
    'Unb',
    'Pasusp',
    'Unifesp',
    'Mackenzie',
    'Albert Einstein'
  ];
}

class UniversityButton extends StatelessWidget {
  final String universityName;

  const UniversityButton({super.key, required this.universityName});

  @override Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        boxShadow: const [
          BoxShadow(
            color: Color.fromARGB(255, 177, 151, 252),
            offset: Offset(3, 3),
            blurRadius: 4,
            spreadRadius: 1
          )
        ]
      ),
      child: ElevatedButton(
        onPressed: () {
          Navigator.pushNamed(context, '/questions', arguments: {
            'universityName': universityName
          });
        },
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20)
          ),
          elevation: 0,
          fixedSize: const Size.fromHeight(82),
          backgroundColor: const Color.fromARGB(255, 208, 191, 255),
        ),
        child: Text(
          universityName,
          style: const TextStyle(
            fontFamily: 'RobotoSlab',
            fontWeight: FontWeight.w700,
            fontSize: 30,
            color: Colors.black
          )
        )
      ),
    );
  }
}